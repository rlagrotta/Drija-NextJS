export type WorkWithUsMascot = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type WorkWithUsContact = {
  email: string;
  whatsappUrl: Record<"es" | "en", string>;
};

export type WorkWithUsPageConfig = {
  mascot: WorkWithUsMascot;
  contact: WorkWithUsContact;
};
