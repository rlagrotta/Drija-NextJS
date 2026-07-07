import type { ContentTranslations } from "@/types/content-i18n";

export const REGISTRO_COUNTRIES = [
  "panama",
  "costa-rica",
  "dominican-republic",
  "venezuela",
] as const;

export const REGISTRO_VENEZUELA_CITIES = ["caracas", "interior"] as const;

export const REGISTRO_VENEZUELA_STORES = ["avanti", "damasco"] as const;

export const REGISTRO_INVOICE_TYPES = ["digital", "physical"] as const;

export const REGISTRO_REFERRAL_SOURCES = [
  "social-media",
  "recommendations",
  "ads-agencies",
] as const;

export const REGISTRO_GENDERS = [
  "woman",
  "man",
  "non-binary",
  "fluid",
  "agender",
  "other",
] as const;

export const REGISTRO_OWNED_PRODUCTS = [
  "campana",
  "cocina",
  "horno",
  "microondas",
  "lavadora",
  "secadora",
  "refrigeradora",
] as const;

export const REGISTRO_SERVICE_RATINGS = [
  "very-dissatisfied",
  "dissatisfied",
  "neutral",
  "satisfied",
  "very-satisfied",
] as const;

export const REGISTRO_PROMOTIONAL_OPT_IN = ["yes", "no"] as const;

export type RegistroCountry = (typeof REGISTRO_COUNTRIES)[number];
export type RegistroVenezuelaCity = (typeof REGISTRO_VENEZUELA_CITIES)[number];
export type RegistroVenezuelaStore = (typeof REGISTRO_VENEZUELA_STORES)[number];
export type RegistroInvoiceType = (typeof REGISTRO_INVOICE_TYPES)[number];
export type RegistroReferralSource = (typeof REGISTRO_REFERRAL_SOURCES)[number];
export type RegistroGender = (typeof REGISTRO_GENDERS)[number];
export type RegistroOwnedProduct = (typeof REGISTRO_OWNED_PRODUCTS)[number];
export type RegistroServiceRating = (typeof REGISTRO_SERVICE_RATINGS)[number];
export type RegistroPromotionalOptIn = (typeof REGISTRO_PROMOTIONAL_OPT_IN)[number];

export type RegistroLegalSection = {
  title: string;
  paragraphs: string[];
  items?: string[];
};

export type RegistroPageConfig = {
  destinationEmail: string;
  intro: string[];
  conditions: RegistroLegalSection;
  warranty: RegistroLegalSection;
  venezuela: RegistroLegalSection;
  translations?: ContentTranslations<{
    intro?: string[];
    conditions?: RegistroLegalSection;
    warranty?: RegistroLegalSection;
    venezuela?: RegistroLegalSection;
  }>;
};

export type RegistroFormPayload = {
  fullName: string;
  email: string;
  country: RegistroCountry;
  phone: string;
  productModel: string;
  productModelSlug?: string;
  city?: RegistroVenezuelaCity;
  store?: RegistroVenezuelaStore;
  invoiceType: RegistroInvoiceType;
  invoiceNumber: string;
  invoiceDate: string;
  referralSource: RegistroReferralSource;
  gender: RegistroGender;
  ownedProducts: RegistroOwnedProduct[];
  serviceRating: RegistroServiceRating;
  suggestions?: string;
  promotionalOptIn: RegistroPromotionalOptIn;
  acceptTerms: true;
  recaptchaToken: string;
};
