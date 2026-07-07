import { NextResponse } from "next/server";
import { z } from "zod";
import {
  getRecaptchaSecretKey,
  getRegistroDestinationEmail,
} from "@/lib/registro/page";
import { getResendClient } from "@/lib/resend";
import {
  REGISTRO_COUNTRIES,
  REGISTRO_GENDERS,
  REGISTRO_INVOICE_TYPES,
  REGISTRO_OWNED_PRODUCTS,
  REGISTRO_PROMOTIONAL_OPT_IN,
  REGISTRO_REFERRAL_SOURCES,
  REGISTRO_SERVICE_RATINGS,
  REGISTRO_VENEZUELA_CITIES,
  REGISTRO_VENEZUELA_STORES,
} from "@/types/registro";

const MAX_FILE_BYTES = 4 * 1024 * 1024;

const registroSchema = z
  .object({
    fullName: z.string().min(2, "Nombre requerido"),
    email: z.string().email("Email inválido"),
    country: z.enum(REGISTRO_COUNTRIES),
    phone: z.string().min(6, "Teléfono requerido"),
    productModel: z.string().min(2, "Modelo requerido"),
    productModelSlug: z.string().optional(),
    city: z.enum(REGISTRO_VENEZUELA_CITIES).optional(),
    store: z.enum(REGISTRO_VENEZUELA_STORES).optional(),
    invoiceType: z.enum(REGISTRO_INVOICE_TYPES),
    invoiceNumber: z.string().min(1, "Número de factura requerido"),
    invoiceDate: z.string().min(1, "Fecha requerida"),
    referralSource: z.enum(REGISTRO_REFERRAL_SOURCES),
    gender: z.enum(REGISTRO_GENDERS),
    ownedProducts: z.array(z.enum(REGISTRO_OWNED_PRODUCTS)),
    serviceRating: z.enum(REGISTRO_SERVICE_RATINGS),
    suggestions: z.string().optional(),
    promotionalOptIn: z.enum(REGISTRO_PROMOTIONAL_OPT_IN),
    acceptTerms: z.literal("true", {
      message: "Debe aceptar términos y condiciones",
    }),
    recaptchaToken: z.string().min(1, "Captcha requerido"),
  })
  .superRefine((data, ctx) => {
    if (data.country === "venezuela") {
      if (!data.city) {
        ctx.addIssue({
          code: "custom",
          message: "Ciudad requerida para Venezuela",
          path: ["city"],
        });
      }

      if (!data.store) {
        ctx.addIssue({
          code: "custom",
          message: "Tienda requerida para Venezuela",
          path: ["store"],
        });
      }
    }
  });

async function verifyRecaptcha(token: string, secret: string) {
  if (!secret) return process.env.NODE_ENV !== "production";

  const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      secret,
      response: token,
    }),
  });

  const payload = (await response.json()) as { success?: boolean };
  return payload.success === true;
}

function readFile(formData: FormData, key: string) {
  const value = formData.get(key);
  return value instanceof File && value.size > 0 ? value : null;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    let ownedProducts: string[] = [];
    try {
      ownedProducts = JSON.parse(String(formData.get("ownedProducts") ?? "[]")) as string[];
    } catch {
      return NextResponse.json({ error: "Productos inválidos" }, { status: 400 });
    }

    const parsed = registroSchema.safeParse({
      fullName: String(formData.get("fullName") ?? ""),
      email: String(formData.get("email") ?? ""),
      country: String(formData.get("country") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      productModel: String(formData.get("productModel") ?? ""),
      productModelSlug: String(formData.get("productModelSlug") ?? "") || undefined,
      city: String(formData.get("city") ?? "") || undefined,
      store: String(formData.get("store") ?? "") || undefined,
      invoiceType: String(formData.get("invoiceType") ?? ""),
      invoiceNumber: String(formData.get("invoiceNumber") ?? ""),
      invoiceDate: String(formData.get("invoiceDate") ?? ""),
      referralSource: String(formData.get("referralSource") ?? ""),
      gender: String(formData.get("gender") ?? ""),
      ownedProducts,
      serviceRating: String(formData.get("serviceRating") ?? ""),
      suggestions: String(formData.get("suggestions") ?? "") || undefined,
      promotionalOptIn: String(formData.get("promotionalOptIn") ?? ""),
      acceptTerms: String(formData.get("acceptTerms") ?? ""),
      recaptchaToken: String(formData.get("recaptchaToken") ?? ""),
    });

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Datos inválidos" },
        { status: 400 },
      );
    }

    const captchaValid = await verifyRecaptcha(
      parsed.data.recaptchaToken,
      getRecaptchaSecretKey(),
    );

    if (!captchaValid) {
      return NextResponse.json({ error: "Captcha inválido" }, { status: 400 });
    }

    const files = {
      invoicePhoto: readFile(formData, "invoicePhoto"),
      serialPhoto: readFile(formData, "serialPhoto"),
      warrantyPhoto: readFile(formData, "warrantyPhoto"),
      idPhoto: readFile(formData, "idPhoto"),
    };

    if (
      !files.invoicePhoto ||
      !files.serialPhoto ||
      !files.warrantyPhoto ||
      !files.idPhoto
    ) {
      return NextResponse.json({ error: "Debe adjuntar todos los archivos" }, { status: 400 });
    }

    const fileList = Object.values(files).filter(
      (file): file is File => file !== null,
    );

    for (const file of fileList) {
      if (file.size > MAX_FILE_BYTES) {
        return NextResponse.json(
          { error: "Uno o más archivos superan el tamaño máximo permitido" },
          { status: 400 },
        );
      }
    }

    const data = parsed.data;
    const resend = getResendClient();
    const destinationEmail = getRegistroDestinationEmail();

    const attachments = await Promise.all(
      (Object.entries(files) as [keyof typeof files, File][]).map(
        async ([key, file]) => ({
          filename: `${key}-${file.name}`,
          content: Buffer.from(await file.arrayBuffer()),
        }),
      ),
    );

    const html = `
      <h2>Nuevo registro DRIJA CLUB</h2>
      <p><strong>Nombre:</strong> ${escapeHtml(data.fullName)}</p>
      <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
      <p><strong>País:</strong> ${escapeHtml(data.country)}</p>
      <p><strong>Teléfono:</strong> ${escapeHtml(data.phone)}</p>
      <p><strong>Modelo:</strong> ${escapeHtml(data.productModel)}${
        data.productModelSlug
          ? ` (${escapeHtml(data.productModelSlug)})`
          : ""
      }</p>
      ${
        data.city
          ? `<p><strong>Ciudad:</strong> ${escapeHtml(data.city)}</p>`
          : ""
      }
      ${
        data.store
          ? `<p><strong>Tienda:</strong> ${escapeHtml(data.store)}</p>`
          : ""
      }
      <p><strong>Tipo de factura:</strong> ${escapeHtml(data.invoiceType)}</p>
      <p><strong>Número de factura:</strong> ${escapeHtml(data.invoiceNumber)}</p>
      <p><strong>Fecha de factura:</strong> ${escapeHtml(data.invoiceDate)}</p>
      <p><strong>¿Cómo se enteró?:</strong> ${escapeHtml(data.referralSource)}</p>
      <p><strong>Género:</strong> ${escapeHtml(data.gender)}</p>
      <p><strong>Otros productos:</strong> ${escapeHtml(data.ownedProducts.join(", ") || "—")}</p>
      <p><strong>Calificación servicio:</strong> ${escapeHtml(data.serviceRating)}</p>
      <p><strong>Información promocional:</strong> ${escapeHtml(data.promotionalOptIn)}</p>
      ${
        data.suggestions
          ? `<p><strong>Quejas o sugerencias:</strong><br>${escapeHtml(data.suggestions).replace(/\n/g, "<br>")}</p>`
          : ""
      }
    `;

    if (!resend) {
      console.info("[registro] Resend no configurado — registro simulado:", {
        email: data.email,
        country: data.country,
        destinationEmail,
        attachments: attachments.map((item) => item.filename),
      });
      return NextResponse.json({ data: { ok: true, mode: "development" } });
    }

    const fromEmail = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

    const { error } = await resend.emails.send({
      from: `DRIJA Web <${fromEmail}>`,
      to: [destinationEmail],
      replyTo: data.email,
      subject: `[DRIJA CLUB] Registro — ${data.fullName} (${data.country})`,
      html,
      attachments,
    });

    if (error) {
      console.error("[registro] Resend error:", error);
      return NextResponse.json(
        { error: "No se pudo enviar el registro" },
        { status: 502 },
      );
    }

    return NextResponse.json({ data: { ok: true } });
  } catch (error) {
    console.error("[registro] Unexpected error:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}
