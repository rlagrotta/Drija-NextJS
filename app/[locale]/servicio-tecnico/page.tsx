import { redirect } from "next/navigation";
import { getPageI18n } from "@/lib/i18n/server";
import { SUPPORT_ROUTES } from "@/lib/support/routes";

type PageProps = { params: Promise<{ locale: string }> };

export default async function ServicioTecnicoRedirectPage({ params }: PageProps) {
  const { href } = await getPageI18n(params);
  redirect(href(SUPPORT_ROUTES.technicalService));
}
