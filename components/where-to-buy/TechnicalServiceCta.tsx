import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

type TechnicalServiceCtaProps = {
  url: string;
  label: string;
};

export function TechnicalServiceCta({ url, label }: TechnicalServiceCtaProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-8 flex w-full items-center justify-center gap-3 rounded-full bg-drija-green px-6 py-4 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-drija-green-dark"
    >
      <WhatsAppIcon className="h-5 w-5" />
      <span>{label}</span>
    </a>
  );
}
