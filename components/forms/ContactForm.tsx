"use client";

import Link from "next/link";
import { useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import { CONTACT_COUNTRIES, type ContactFormPayload } from "@/types/contact";

type ContactFormProps = {
  id?: string;
};

const initialState: ContactFormPayload = {
  name: "",
  email: "",
  country: "Panamá",
  phone: "",
  message: "",
  acceptTerms: false,
};

export function ContactForm({ id = "contacto" }: ContactFormProps) {
  const { dict, href } = useI18n();
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = (await res.json()) as { error?: string };

      if (!res.ok) {
        throw new Error(data.error ?? dict.contact.error);
      }

      setStatus("success");
      setForm(initialState);
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : dict.contact.error,
      );
    }
  }

  return (
    <section
      id={id}
      className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8"
    >
      <h2 className="text-2xl font-bold text-neutral-900">{dict.contact.title}</h2>

      <form
        onSubmit={handleSubmit}
        className="contact-form mt-6 grid gap-4 sm:grid-cols-2"
      >
        <label className="flex flex-col gap-1 text-sm font-medium text-neutral-700">
          {dict.contact.name}
          <input
            required
            type="text"
            name="name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="rounded-lg border border-neutral-300 px-3 py-2"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium text-neutral-700">
          {dict.contact.email}
          <input
            required
            type="email"
            name="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="rounded-lg border border-neutral-300 px-3 py-2"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium text-neutral-700">
          {dict.contact.country}
          <select
            required
            name="country"
            value={form.country}
            onChange={(e) =>
              setForm({
                ...form,
                country: e.target.value as ContactFormPayload["country"],
              })
            }
            className="rounded-lg border border-neutral-300 px-3 py-2"
          >
            <option value="">{dict.contact.countryPlaceholder}</option>
            {CONTACT_COUNTRIES.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium text-neutral-700">
          {dict.contact.phone}
          <input
            required
            type="tel"
            name="phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="rounded-lg border border-neutral-300 px-3 py-2"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium text-neutral-700 sm:col-span-2">
          {dict.contact.message}
          <textarea
            required
            name="message"
            rows={5}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="rounded-lg border border-neutral-300 px-3 py-2"
          />
        </label>

        <label className="flex items-start gap-2 text-sm text-neutral-700 sm:col-span-2">
          <input
            required
            type="checkbox"
            checked={form.acceptTerms}
            onChange={(e) =>
              setForm({ ...form, acceptTerms: e.target.checked })
            }
            className="mt-1"
          />
          <span>
            {dict.contact.terms}{" "}
            <Link
              href={href("/avisos-legales")}
              className="text-drija-green underline"
            >
              {dict.contact.termsLink}
            </Link>
            .
          </span>
        </label>

        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={status === "loading"}
            className="inline-flex w-full items-center justify-center rounded-full bg-drija-green px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-drija-green-dark disabled:opacity-60 sm:w-auto"
          >
            {status === "loading" ? dict.contact.sending : dict.contact.submit}
          </button>
        </div>

        {status === "success" && (
          <p
            className="text-sm font-medium text-drija-green sm:col-span-2"
            role="status"
          >
            {dict.contact.success}
          </p>
        )}
        {status === "error" && (
          <p
            className="text-sm font-medium text-red-600 sm:col-span-2"
            role="alert"
          >
            {errorMessage}
          </p>
        )}
      </form>
    </section>
  );
}
