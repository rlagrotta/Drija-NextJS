export const siteConfig = {
  name: "DRIJA",
  title: "DRIJA International",
  description:
    "Electrodomésticos de calidad para tu hogar. Refrigeradores, hornos, estufas y más.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://drijainternational.com",
  contactEmail:
    process.env.CONTACT_TO_EMAIL ?? "contacto@drijainternational.com",
  social: {
    facebook:
      "https://www.facebook.com/people/DRIJA-Internacional/61577808197889/",
    instagram: "https://www.instagram.com/drijainternational/",
    tiktok: "https://www.tiktok.com/@drijainternacional",
    youtube: "https://www.youtube.com/@DrijaInternational",
    linkedin:
      "https://www.linkedin.com/company/drija/posts/?feedView=all",
  },
  legal: {
    termsUrl: "/avisos-legales",
  },
  catalogDownloadUrl: "/catalogo/drija.pdf",
} as const;
