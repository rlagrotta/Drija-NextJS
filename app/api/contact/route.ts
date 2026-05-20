import { NextResponse } from "next/server";
import { z } from "zod";
import { getResendClient } from "@/lib/resend";
import { siteConfig } from "@/lib/site";
import { CONTACT_COUNTRIES } from "@/types/contact";

const contactSchema = z.object({
  name: z.string().min(2, "Nombre requerido"),
  email: z.string().email("Email inválido"),
  country: z.enum(CONTACT_COUNTRIES),
  phone: z.string().min(6, "Teléfono requerido"),
  message: z.string().min(10, "Mensaje muy corto"),
  acceptTerms: z.literal(true, {
    message: "Debe aceptar términos y condiciones",
  }),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Datos inválidos" },
        { status: 400 },
      );
    }

    const { name, email, country, phone, message } = parsed.data;
    const resend = getResendClient();

    if (!resend) {
      console.info("[contact] Resend no configurado — mensaje simulado:", {
        name,
        email,
        country,
        phone,
      });
      return NextResponse.json({
        data: { ok: true, mode: "development" },
      });
    }

    const fromEmail =
      process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

    const { error } = await resend.emails.send({
      from: `DRIJA Web <${fromEmail}>`,
      to: [siteConfig.contactEmail],
      replyTo: email,
      subject: `[DRIJA] Contacto — ${name} (${country})`,
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>País:</strong> ${country}</p>
        <p><strong>Teléfono:</strong> ${phone}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json(
        { error: "No se pudo enviar el correo" },
        { status: 502 },
      );
    }

    return NextResponse.json({ data: { ok: true } });
  } catch {
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}
