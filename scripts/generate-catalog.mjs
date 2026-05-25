/**
 * Genera products.json y category-pages.json desde el catálogo DRIJA.
 * Ejecutar: node scripts/generate-catalog.mjs
 */

import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = join(__dirname, "..", "data");

/** @type {Record<string, Record<string, string[]>>} */
const CATALOG = {
  extractores: {
    canopio: ["Sottile 90-B", "Sottile 60-B", "Invisibile 76-I"],
    compactas: [
      "Retráctil Touch 60",
      "Compatto 90 Black",
      "Retractil Touch 90",
      "Retráctil Touch 76",
      "Slim Touch 90 Acero",
      "Slim Touch 76 Acero",
      "Slim Touch 90 Black",
      "Slim Touch 76 Black",
      "Slim Touch 60 Black",
      "Compatto 90 Acero",
      "Compatto 76 Black",
      "Compatto 60 Black",
    ],
    isla: [
      "Trapecio 90 Black",
      "Triangulo 90",
      "Triangulo 76",
      "Piramide 90 Black",
      "Quadrato 90 Black | Acero",
      "Quadrato Isla 76 Black",
    ],
    pared: [
      "Trapezio 90 Black",
      "Triangulo 90",
      "Triangulo 76",
      "Triangulo 60",
      "Piramide 90 Black",
      "Quadrato 90 Black | Acero",
      "Quadrato 76 | Black Acero",
      "Reactangulo 90 Black",
      "Resctangulo 76 Black",
      "Prisma Touch 90 Black | Acero",
      "Prisma Touch 76 Black | Acero",
      "Prisma Touch 60 Black | Acero",
      "Galaxy 90 Black | Acero",
      "Galaxy 76 Black | Acero",
    ],
  },
  hornos: {
    "torre-horno-microondas": ["Atlantic 76-B"],
    electricos: [
      "América 90 Air-A",
      "Pacific 76 Air-A",
      "Caribe 76 Air-A",
      "America 90 Air",
      "Indico 60 Air",
      "Pacífico 76 Air",
      "Caribe 76 Air",
      "Latino 60 Black",
    ],
    gas: ["Roma 76 Gas Grill", "Europa 60 Gas Grill Air", "Norteamerica 90", "Europa 60 Gas Grill"],
    "gas-grill": [],
  },
  refrigeradores: {
    empotrables: ["Glass-B 18FD4P", "Glass-B 18CD4P", "Dark-I 18FD4P", "Dark-I 18CD4P"],
    ejecutivas: ["Mirror 3", "Black 3"],
    "french-door": [
      "Mirror 18D4P",
      "Inox 18D4P",
      "Inox 20D3P",
      "Black 19D4P",
      "Black 18D4P",
      "Inox 18D3P",
    ],
    "side-by-side": [
      "Mirror 18",
      "White 23",
      "Black 23",
      "Inox 23",
      "Mirror 20 CFAH",
      "Black 20CFAH",
      "Black 18",
      "Inox 18",
      "Mirror",
      "Inox",
      "Black",
      "Silver",
    ],
    twin: ["Twin-36D4PIPH", "Twin-36D4PD"],
  },
  "fabricador-de-hielo": {
    empotrables: ["FH45 Black", "FH 36 Black"],
    "no-empotrables": ["FH18 Inox", "FH12-Inox | Black"],
  },
  microondas: {
    "microondas-empotrables": [
      "Veneto 62L Black -I",
      "Veneto 62L Black",
      "Palermo 62L",
      "Napoli 25L Black",
      "Sorrento 25L Black",
      "Florencia 25L Black",
    ],
    "microondas-extractor": ["Varenna 42L-I"],
  },
  "dispensadores-de-agua": {
    acqua: ["Acqua"],
    lusso: ["Lusso"],
  },
  lavadoras: {
    "lava-seca": ["LavaSciuga 1609", "Lavatrice 1305"],
  },
  "centros-de-bebidas": {
    empotrables: ["Livenza 178-B"],
    "no-empotrables": ["Piave 70-B"],
  },
  "pequenos-electrodomesticos": {
    cafetera: ["Mocca 8T-B", "Afogatto 12T-B"],
    "horno-electrico": ["Bruschetta 25-L-B"],
    "juegos-ollas-sartenes": ["Bucatini 19-B"],
    "estufas-portatiles": ["Múnich 28"],
    "freidoras-de-aire": ["Calzone", "Cartoccio"],
    licuadoras: ["Miscelatore"],
  },
  "calentadores-de-agua": {
    gas: ["CLT10L Black", "CLT13L", "CLT17L", "CLT21L"],
    electricos: [],
  },
  fregaderos: {
    fregaderos: [
      "Murano 61",
      "Murano 76",
      "Murano 84",
      "Cirella 68",
      "Amalfi 76",
      "Amalfi 84",
      "Bolonia 61",
      "Bolonia 76",
      "Bolonia 84",
      "Capri 76",
      "Capri 84",
      "Lucca 84",
      "Siena 75",
      "Siena 84",
    ],
    grifos: ["Pisa Black", "Pisa Gold"],
    trituradores: ["Frantoio ½ HP"],
  },
  estufas: {
    piso: ["Venecia 90", "Venecia 76"],
    "tope-dual": ["Sicilia 76", "Sicilia Touch 90", "Sicilia Touch 60", "Sicilia 30"],
    "tope-electrico": [
      "Bari 90-A",
      "Bari 60-A",
      "Bari 30-A",
      "Bari 90",
      "Bari 76",
      "Berlín 90",
      "Berlin 76",
      "Bari 60",
      "Berlín 60",
      "Berlín 30",
      "Bari 30",
    ],
    "tope-induccion": ["Múnich 90", "Munich 76", "Múnich 60", "Múnich 30"],
    "tope-gas": [
      "Italia 90",
      "Italia 76",
      "Lazio 90",
      "Milán 60 Pro",
      "Ferrara 60 Pro",
      "Toscana 91",
      "Toscana 60 Pro",
      "Toscana 30",
      "Milán 91",
      "Milán 30",
      "Turín 60",
    ],
  },
  vineras: {
    empotrables: [
      "Lambrusco 160",
      "Chianti 154",
      "Dolce 110",
      "Ciro 46",
      "Bere 20",
      "Chiaretto 31",
      "Syrah 20",
      "Malbec 7",
    ],
    "no-empotrables": ["Rosso 8", "Merlot 29", "Tempranillo 8"],
  },
};

/** @type {Record<string, { es: string; en: string }>} */
const SUBCATEGORY_LABELS = {
  canopio: { es: "Canopio", en: "Canopy" },
  compactas: { es: "Compactas", en: "Compact" },
  isla: { es: "Isla", en: "Island" },
  pared: { es: "Pared", en: "Wall-mounted" },
  "torre-horno-microondas": { es: "Torre de horno microondas", en: "Oven-microwave tower" },
  electricos: { es: "Eléctricos", en: "Electric" },
  gas: { es: "Gas", en: "Gas" },
  "gas-grill": { es: "Gas/Grill", en: "Gas/Grill" },
  empotrables: { es: "Empotrables", en: "Built-in" },
  "no-empotrables": { es: "No empotrables", en: "Freestanding" },
  ejecutivas: { es: "Ejecutivas", en: "Executive" },
  "french-door": { es: "French Door", en: "French Door" },
  "side-by-side": { es: "Side by Side", en: "Side by Side" },
  twin: { es: "Twin", en: "Twin" },
  "microondas-empotrables": { es: "Microondas empotrables", en: "Built-in microwaves" },
  "microondas-extractor": { es: "Microondas extractor", en: "Microwave hood" },
  acqua: { es: "Acqua", en: "Acqua" },
  lusso: { es: "Lusso", en: "Lusso" },
  "lava-seca": { es: "Lava-Seca", en: "Washer-dryer" },
  cafetera: { es: "Cafetera", en: "Coffee maker" },
  "horno-electrico": { es: "Horno eléctrico", en: "Electric oven" },
  "juegos-ollas-sartenes": { es: "Juegos de ollas y sartenes", en: "Cookware sets" },
  "estufas-portatiles": { es: "Estufas portátiles", en: "Portable stoves" },
  "freidoras-de-aire": { es: "Freidoras de aire", en: "Air fryers" },
  licuadoras: { es: "Licuadoras", en: "Blenders" },
  fregaderos: { es: "Fregaderos", en: "Sinks" },
  grifos: { es: "Grifos", en: "Faucets" },
  trituradores: { es: "Trituradores", en: "Disposals" },
  piso: { es: "Piso", en: "Freestanding" },
  "tope-dual": { es: "Tope dual", en: "Dual cooktop" },
  "tope-electrico": { es: "Tope eléctrico", en: "Electric cooktop" },
  "tope-induccion": { es: "Tope inducción", en: "Induction cooktop" },
  "tope-gas": { es: "Tope gas", en: "Gas cooktop" },
};

function slugify(name) {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[|/½]/g, " ")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function makeProduct(categorySlug, subcategorySlug, name, index) {
  const slug = slugify(name);
  const id = `prod-${categorySlug}-${slug}`.slice(0, 80);
  const sku = name.replace(/\s+/g, "-").toUpperCase().slice(0, 24);
  const imagePath = `/images/products/${categorySlug}/${slug}.jpg`;

  return {
    id,
    slug: `${categorySlug}-${slug}`,
    name,
    shortDescription: `${name} — línea DRIJA.`,
    description: `${name} forma parte de la línea DRIJA. Consulte especificaciones técnicas y disponibilidad en su país.`,
    categorySlug,
    subcategorySlug,
    sku,
    images: [{ src: imagePath, alt: `${name} DRIJA` }],
    translations: {
      en: {
        name,
        shortDescription: `${name} — DRIJA line.`,
        description: `${name} is part of the DRIJA product line. Check technical specifications and availability in your country.`,
        images: [{ src: imagePath, alt: `DRIJA ${name}` }],
      },
    },
  };
}

function makeSubcategory(categorySlug, slug, order) {
  const labels = SUBCATEGORY_LABELS[slug] ?? {
    es: slug.replace(/-/g, " "),
    en: slug.replace(/-/g, " "),
  };
  const icon = `/images/categories/${categorySlug}.jpg`;

  return {
    id: `sub-${categorySlug}-${slug}`,
    slug,
    name: labels.es,
    icon: { src: icon, alt: labels.es },
    order,
    translations: {
      en: {
        name: labels.en,
        icon: { src: icon, alt: labels.en },
      },
    },
  };
}

function makeCategoryPage(categorySlug, subcategoryMap) {
  const subcategories = Object.keys(subcategoryMap)
    .filter((slug) => subcategoryMap[slug].length > 0)
    .map((slug, i) => makeSubcategory(categorySlug, slug, i + 1));

  const hero =
    categorySlug === "refrigeradores"
      ? "/images/categories/refrigeradores-hero.jpg"
      : `/images/categories/${categorySlug}.jpg`;

  return {
    categorySlug,
    heroImage: {
      src: hero,
      alt: `DRIJA ${categorySlug}`,
    },
    catalog: {
      onlineUrl: "/productos",
      downloadUrl: `/catalogo/${categorySlug}.pdf`,
      image: { src: hero, alt: `Catálogo ${categorySlug} DRIJA` },
    },
    subcategories,
  };
}

const products = [];
const categoryPages = {};
const seenSlugs = new Set();

for (const [categorySlug, subcategoryMap] of Object.entries(CATALOG)) {
  categoryPages[categorySlug] = makeCategoryPage(categorySlug, subcategoryMap);

  for (const [subcategorySlug, names] of Object.entries(subcategoryMap)) {
    const unique = [...new Set(names)];
    unique.forEach((name, index) => {
      const product = makeProduct(categorySlug, subcategorySlug, name, index);
      if (seenSlugs.has(product.slug)) return;
      seenSlugs.add(product.slug);
      products.push(product);
    });
  }
}

writeFileSync(
  join(dataDir, "category-pages.json"),
  JSON.stringify(categoryPages, null, 2) + "\n",
);

const featuredCategories = [
  "refrigeradores",
  "extractores",
  "hornos",
  "lavadoras",
];
for (const cat of featuredCategories) {
  const p = products.find((x) => x.categorySlug === cat);
  if (p) p.featured = true;
}

writeFileSync(
  join(dataDir, "products.json"),
  JSON.stringify(products, null, 2) + "\n",
);

console.log(`Generated ${products.length} products across ${Object.keys(categoryPages).length} categories.`);
