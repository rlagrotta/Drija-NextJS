import heroSlidesData from "@/data/hero-slides.json";
import type { Locale } from "@/lib/i18n/config";
import type { HeroSlide, HeroSlidesData } from "@/types/hero";

const data = heroSlidesData as HeroSlidesData;

export function getHeroSlides(locale: Locale): HeroSlide[] {
  return data.slides.map((slide) => slide.images[locale]);
}
