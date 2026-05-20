export type HeroSlideImage = {
  src: string;
  alt: string;
};

export type HeroSlideRecord = {
  id: string;
  images: {
    es: HeroSlideImage;
    en: HeroSlideImage;
  };
};

export type HeroSlidesData = {
  slides: HeroSlideRecord[];
};

export type HeroSlide = HeroSlideImage;
