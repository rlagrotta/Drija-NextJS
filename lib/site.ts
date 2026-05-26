export const siteConfig = {
  name: "DRIJA",
  title: "DRIJA International",
  description:
    "Electrodomésticos de calidad para tu hogar. Refrigeradores, hornos, estufas y más.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://drijainternational.com",
  contactEmail:
    process.env.CONTACT_TO_EMAIL ?? "contacto@drijainternational.com",
  social: {
    facebook: "https://www.facebook.com/drija",
    instagram: "https://www.instagram.com/drija",
    youtube: "https://www.youtube.com/drija",
  },
  legal: {
    termsUrl: "/avisos-legales",
  },
  catalogDownloadUrl: "/catalogo/drija.pdf",
} as const;
