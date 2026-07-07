"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { ProductModelAutocomplete } from "@/components/registro/fields/ProductModelAutocomplete";
import { RecaptchaField } from "@/components/registro/fields/RecaptchaField";
import { RegistroCheckboxGroup } from "@/components/registro/fields/RegistroCheckboxGroup";
import { RegistroFileUpload } from "@/components/registro/fields/RegistroFileUpload";
import { RegistroRadioGroup } from "@/components/registro/fields/RegistroRadioGroup";
import { useI18n } from "@/lib/i18n/context";
import {
  REGISTRO_COUNTRIES,
  REGISTRO_GENDERS,
  REGISTRO_INVOICE_TYPES,
  REGISTRO_OWNED_PRODUCTS,
  REGISTRO_PROMOTIONAL_OPT_IN,
  REGISTRO_REFERRAL_SOURCES,
  REGISTRO_SERVICE_RATINGS,
  REGISTRO_VENEZUELA_CITIES,
  REGISTRO_VENEZUELA_STORES,
  type RegistroCountry,
  type RegistroGender,
  type RegistroInvoiceType,
  type RegistroOwnedProduct,
  type RegistroPromotionalOptIn,
  type RegistroReferralSource,
  type RegistroServiceRating,
  type RegistroVenezuelaCity,
  type RegistroVenezuelaStore,
} from "@/types/registro";

import styles from "./RegistroPage.module.css";

const MAX_FILE_BYTES = 4 * 1024 * 1024;

type RegistroFormProps = {
  recaptchaSiteKey: string;
};

type FormState = {
  fullName: string;
  email: string;
  country: RegistroCountry | "";
  phone: string;
  productModel: string;
  productModelSlug: string;
  city: RegistroVenezuelaCity | "";
  store: RegistroVenezuelaStore | "";
  invoiceType: RegistroInvoiceType | "";
  invoiceNumber: string;
  invoiceDate: string;
  referralSource: RegistroReferralSource | "";
  gender: RegistroGender | "";
  ownedProducts: RegistroOwnedProduct[];
  serviceRating: RegistroServiceRating | "";
  suggestions: string;
  promotionalOptIn: RegistroPromotionalOptIn | "";
  acceptTerms: boolean;
  recaptchaToken: string;
};

const initialState: FormState = {
  fullName: "",
  email: "",
  country: "",
  phone: "",
  productModel: "",
  productModelSlug: "",
  city: "",
  store: "",
  invoiceType: "",
  invoiceNumber: "",
  invoiceDate: "",
  referralSource: "",
  gender: "",
  ownedProducts: [],
  serviceRating: "",
  suggestions: "",
  promotionalOptIn: "",
  acceptTerms: false,
  recaptchaToken: "",
};

type UploadKey = "invoicePhoto" | "serialPhoto" | "warrantyPhoto" | "idPhoto";

export function RegistroForm({ recaptchaSiteKey }: RegistroFormProps) {
  const { dict, href } = useI18n();
  const copy = dict.registroForm;
  const options = copy.options;

  const [form, setForm] = useState<FormState>(initialState);
  const [uploads, setUploads] = useState<Record<UploadKey, File | null>>({
    invoicePhoto: null,
    serialPhoto: null,
    warrantyPhoto: null,
    idPhoto: null,
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");

  const isVenezuela = form.country === "venezuela";

  const optionLabel = useMemo(
    () => ({
      country: (value: RegistroCountry) => options.countries[value],
      city: (value: RegistroVenezuelaCity) => options.cities[value],
      store: (value: RegistroVenezuelaStore) => options.stores[value],
      invoiceType: (value: RegistroInvoiceType) => options.invoiceTypes[value],
      referralSource: (value: RegistroReferralSource) => options.referralSources[value],
      gender: (value: RegistroGender) => options.genders[value],
      ownedProduct: (value: RegistroOwnedProduct) => options.ownedProducts[value],
      serviceRating: (value: RegistroServiceRating) => options.serviceRatings[value],
      promotionalOptIn: (value: RegistroPromotionalOptIn) =>
        options.promotionalOptIn[value],
    }),
    [options],
  );

  const updateUpload = (key: UploadKey, file: File | null) => {
    if (file && file.size > MAX_FILE_BYTES) {
      setErrorMessage(copy.fileTooLarge);
      setStatus("error");
      return;
    }

    setUploads((current) => ({ ...current, [key]: file }));
  };

  const handleRecaptchaChange = useCallback((token: string) => {
    setForm((current) => ({ ...current, recaptchaToken: token }));
  }, []);

  const handleRecaptchaExpire = useCallback(() => {
    setForm((current) => ({ ...current, recaptchaToken: "" }));
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    if (!uploads.invoicePhoto || !uploads.serialPhoto || !uploads.warrantyPhoto || !uploads.idPhoto) {
      setStatus("error");
      setErrorMessage(copy.missingFiles);
      return;
    }

    try {
      const payload = new FormData();
      payload.append("fullName", form.fullName);
      payload.append("email", form.email);
      payload.append("country", form.country);
      payload.append("phone", form.phone);
      payload.append("productModel", form.productModel);
      if (form.productModelSlug) payload.append("productModelSlug", form.productModelSlug);
      if (isVenezuela && form.city) payload.append("city", form.city);
      if (isVenezuela && form.store) payload.append("store", form.store);
      payload.append("invoiceType", form.invoiceType);
      payload.append("invoiceNumber", form.invoiceNumber);
      payload.append("invoiceDate", form.invoiceDate);
      payload.append("referralSource", form.referralSource);
      payload.append("gender", form.gender);
      payload.append("ownedProducts", JSON.stringify(form.ownedProducts));
      payload.append("serviceRating", form.serviceRating);
      payload.append("suggestions", form.suggestions);
      payload.append("promotionalOptIn", form.promotionalOptIn);
      payload.append("acceptTerms", String(form.acceptTerms));
      payload.append("recaptchaToken", form.recaptchaToken);
      payload.append("invoicePhoto", uploads.invoicePhoto);
      payload.append("serialPhoto", uploads.serialPhoto);
      payload.append("warrantyPhoto", uploads.warrantyPhoto);
      payload.append("idPhoto", uploads.idPhoto);

      const response = await fetch("/api/registro", {
        method: "POST",
        body: payload,
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(data.error ?? copy.error);
      }

      setStatus("success");
      setForm(initialState);
      setUploads({
        invoicePhoto: null,
        serialPhoto: null,
        warrantyPhoto: null,
        idPhoto: null,
      });
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : copy.error);
    }
  }

  return (
    <form className={styles.formSection} onSubmit={handleSubmit} noValidate>
      <div className={styles.fieldGroup}>
        <label className={styles.label} htmlFor="registro-full-name">
          {copy.fullName}
        </label>
        <input
          id="registro-full-name"
          type="text"
          required
          className={styles.field}
          value={form.fullName}
          onChange={(event) =>
            setForm((current) => ({ ...current, fullName: event.target.value }))
          }
        />
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label} htmlFor="registro-email">
          {copy.email}
        </label>
        <input
          id="registro-email"
          type="email"
          required
          className={styles.field}
          value={form.email}
          onChange={(event) =>
            setForm((current) => ({ ...current, email: event.target.value }))
          }
        />
      </div>

      <RegistroRadioGroup
        name="country"
        legend={copy.country}
        value={form.country}
        options={REGISTRO_COUNTRIES}
        getLabel={optionLabel.country}
        onChange={(country) =>
          setForm((current) => ({
            ...current,
            country,
            city: country === "venezuela" ? current.city : "",
            store: country === "venezuela" ? current.store : "",
          }))
        }
      />

      <div className={styles.fieldGroup}>
        <label className={styles.label} htmlFor="registro-phone">
          {copy.phone}
        </label>
        <input
          id="registro-phone"
          type="tel"
          required
          className={styles.field}
          value={form.phone}
          onChange={(event) =>
            setForm((current) => ({ ...current, phone: event.target.value }))
          }
        />
      </div>

      <ProductModelAutocomplete
        label={copy.productModel}
        value={form.productModel}
        onChange={(productModel, productModelSlug) =>
          setForm((current) => ({
            ...current,
            productModel,
            productModelSlug: productModelSlug ?? "",
          }))
        }
      />

      {isVenezuela ? (
        <>
          <RegistroRadioGroup
            name="city"
            legend={copy.city}
            value={form.city}
            options={REGISTRO_VENEZUELA_CITIES}
            getLabel={optionLabel.city}
            onChange={(city) => setForm((current) => ({ ...current, city }))}
          />

          <RegistroRadioGroup
            name="store"
            legend={copy.store}
            value={form.store}
            options={REGISTRO_VENEZUELA_STORES}
            getLabel={optionLabel.store}
            onChange={(store) => setForm((current) => ({ ...current, store }))}
          />
        </>
      ) : null}

      <RegistroRadioGroup
        name="invoiceType"
        legend={copy.invoiceType}
        value={form.invoiceType}
        options={REGISTRO_INVOICE_TYPES}
        getLabel={optionLabel.invoiceType}
        onChange={(invoiceType) =>
          setForm((current) => ({ ...current, invoiceType }))
        }
      />

      <div className={styles.fieldGroup}>
        <label className={styles.label} htmlFor="registro-invoice-number">
          {copy.invoiceNumber}
        </label>
        <input
          id="registro-invoice-number"
          type="text"
          required
          className={styles.field}
          value={form.invoiceNumber}
          onChange={(event) =>
            setForm((current) => ({ ...current, invoiceNumber: event.target.value }))
          }
        />
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label} htmlFor="registro-invoice-date">
          {copy.invoiceDate}
        </label>
        <input
          id="registro-invoice-date"
          type="date"
          required
          className={styles.field}
          value={form.invoiceDate}
          onChange={(event) =>
            setForm((current) => ({ ...current, invoiceDate: event.target.value }))
          }
        />
      </div>

      <RegistroRadioGroup
        name="referralSource"
        legend={copy.referralSource}
        value={form.referralSource}
        options={REGISTRO_REFERRAL_SOURCES}
        getLabel={optionLabel.referralSource}
        onChange={(referralSource) =>
          setForm((current) => ({ ...current, referralSource }))
        }
      />

      <RegistroRadioGroup
        name="gender"
        legend={copy.gender}
        value={form.gender}
        options={REGISTRO_GENDERS}
        getLabel={optionLabel.gender}
        onChange={(gender) => setForm((current) => ({ ...current, gender }))}
      />

      <RegistroCheckboxGroup
        legend={copy.ownedProducts}
        values={form.ownedProducts}
        options={REGISTRO_OWNED_PRODUCTS}
        getLabel={optionLabel.ownedProduct}
        onChange={(ownedProducts) =>
          setForm((current) => ({ ...current, ownedProducts }))
        }
      />

      <RegistroRadioGroup
        name="serviceRating"
        legend={copy.serviceRating}
        value={form.serviceRating}
        options={REGISTRO_SERVICE_RATINGS}
        getLabel={optionLabel.serviceRating}
        onChange={(serviceRating) =>
          setForm((current) => ({ ...current, serviceRating }))
        }
      />

      <div className={styles.fieldGroup}>
        <label className={styles.label} htmlFor="registro-suggestions">
          {copy.suggestions}
        </label>
        <textarea
          id="registro-suggestions"
          className={`${styles.field} ${styles.textarea}`}
          value={form.suggestions}
          onChange={(event) =>
            setForm((current) => ({ ...current, suggestions: event.target.value }))
          }
        />
      </div>

      <RegistroRadioGroup
        name="promotionalOptIn"
        legend={copy.promotionalOptIn}
        value={form.promotionalOptIn}
        options={REGISTRO_PROMOTIONAL_OPT_IN}
        getLabel={optionLabel.promotionalOptIn}
        onChange={(promotionalOptIn) =>
          setForm((current) => ({ ...current, promotionalOptIn }))
        }
      />

      <div className={styles.uploadRow}>
        <RegistroFileUpload
          label={copy.uploadInvoice}
          fileName={uploads.invoicePhoto?.name}
          noFileLabel={copy.noFileSelected}
          onChange={(file) => updateUpload("invoicePhoto", file)}
        />
        <RegistroFileUpload
          label={copy.uploadSerial}
          fileName={uploads.serialPhoto?.name}
          noFileLabel={copy.noFileSelected}
          onChange={(file) => updateUpload("serialPhoto", file)}
        />
        <RegistroFileUpload
          label={copy.uploadWarranty}
          fileName={uploads.warrantyPhoto?.name}
          noFileLabel={copy.noFileSelected}
          onChange={(file) => updateUpload("warrantyPhoto", file)}
        />
        <RegistroFileUpload
          label={copy.uploadId}
          tone="blue"
          fileName={uploads.idPhoto?.name}
          noFileLabel={copy.noFileSelected}
          onChange={(file) => updateUpload("idPhoto", file)}
        />
      </div>

      <label className={styles.termsRow}>
        <input
          type="checkbox"
          checked={form.acceptTerms}
          onChange={(event) =>
            setForm((current) => ({ ...current, acceptTerms: event.target.checked }))
          }
        />
        <span>
          {copy.termsAccept}{" "}
          <Link href={href("/avisos-legales")} className={styles.termsLink}>
            {copy.termsLink}
          </Link>
        </span>
      </label>

      <RecaptchaField
        siteKey={recaptchaSiteKey}
        onChange={handleRecaptchaChange}
        onExpire={handleRecaptchaExpire}
      />

      <button
        type="submit"
        className={styles.submit}
        disabled={status === "loading" || !form.acceptTerms || !form.recaptchaToken}
      >
        {status === "loading" ? copy.sending : copy.submit}
      </button>

      {status === "success" ? (
        <p className={`${styles.status} ${styles.statusSuccess}`} role="status">
          {copy.success}
        </p>
      ) : null}

      {status === "error" ? (
        <p className={`${styles.status} ${styles.statusError}`} role="alert">
          {errorMessage || copy.error}
        </p>
      ) : null}

      <p className={styles.termsFooter}>
        <Link href={href("/avisos-legales")} className={styles.termsFooterLink}>
          {copy.termsFooter}
        </Link>
      </p>
    </form>
  );
}
