import type { Dictionary } from "@/lib/i18n/types";
import type { SupportHelpItem } from "@/components/support/SupportHelpSection";
import { SUPPORT_ROUTES } from "@/lib/support/routes";

const SUPPORT_ICONS = {
  // TODO: replace with dedicated FAQ icon when available
  faq: "/images/support/Icono_Garantias_DRIJA.png",
  manuals: "/images/support/Icono_Manuales_DRIJA.png",
  technicalService: "/images/support/Icono_Servicio_Tecnico_DRIJA.png",
  catalogs: "/images/support/Icono_Catalogo_DRIJA.png",
  warranties: "/images/support/Icono_Garantias_DRIJA.png",
} as const;

export function buildSupportHelpItems(
  dict: Dictionary,
  href: (path: string) => string,
): SupportHelpItem[] {
  return [
    {
      label: dict.support.faq,
      href: href(SUPPORT_ROUTES.faq),
      iconSrc: SUPPORT_ICONS.faq,
      iconAlt: dict.support.faq,
    },
    {
      label: dict.support.manuals,
      href: href("/manuales"),
      iconSrc: SUPPORT_ICONS.manuals,
      iconAlt: dict.support.manuals,
    },
    {
      label: dict.support.technicalService,
      href: href(SUPPORT_ROUTES.technicalService),
      iconSrc: SUPPORT_ICONS.technicalService,
      iconAlt: dict.support.technicalService,
    },
    {
      label: dict.support.catalogs,
      href: href(SUPPORT_ROUTES.catalogs),
      iconSrc: SUPPORT_ICONS.catalogs,
      iconAlt: dict.support.catalogs,
    },
    {
      label: dict.support.warranties,
      href: href(SUPPORT_ROUTES.warranties),
      iconSrc: SUPPORT_ICONS.warranties,
      iconAlt: dict.support.warranties,
    },
  ];
}
