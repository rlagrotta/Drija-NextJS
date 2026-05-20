import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
      <h1 className="text-4xl font-bold text-neutral-900">404</h1>
      <p className="mt-4 text-neutral-600">
        La página que buscas no existe. / The page you are looking for does not
        exist.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          href="/"
          className="inline-flex rounded-full bg-drija-green px-6 py-3 text-sm font-bold uppercase text-white hover:bg-drija-green-dark"
        >
          Español
        </Link>
        <Link
          href="/en"
          className="inline-flex rounded-full border border-neutral-300 px-6 py-3 text-sm font-bold uppercase hover:border-drija-green hover:text-drija-green"
        >
          English
        </Link>
      </div>
    </section>
  );
}
