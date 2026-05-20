# DRIJA International — Next.js

Sitio corporativo de DRIJA reconstruido con Next.js App Router, Tailwind CSS y arquitectura preparada para CMS (Sanity) e internacionalización.

## Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS v4
- Resend (formulario de contacto)
- Datos mock bilingües en JSON (`/data`) — español en raíz, inglés en `translations.en`

## Estructura

```
app/                 # Rutas y API routes
components/          # UI reutilizable
data/                # Mock JSON (reemplazable por Sanity)
lib/cms/             # Adaptador de contenido
lib/i18n/            # Config i18n (es/en)
messages/            # Diccionarios
types/               # Tipos TypeScript
styles/              # CSS vanilla complementario
```

## Desarrollo

```bash
cp .env.example .env.local
npm install
npm run dev
```

Sin `RESEND_API_KEY`, el endpoint `/api/contact` responde OK en modo desarrollo (log en consola).

## API interna

| Endpoint | Descripción |
|----------|-------------|
| `GET /api/products` | Lista productos (`?category=&featured=&country=&locale=en`) |
| `GET /api/products/[slug]` | Detalle producto |
| `GET /api/categories` | Categorías |
| `GET /api/categories/[slug]` | Categoría + productos |
| `GET /api/blog` | Posts (`?featured=true`) |
| `GET /api/blog/[slug]` | Artículo |
| `GET /api/retailers` | Tiendas por país |
| `GET /api/support` | FAQ por categoría |
| `POST /api/contact` | Formulario contacto |

## Páginas

- `/` — Home
- `/productos` — Categorías
- `/categories/[slug]` — Productos por categoría
- `/products/[slug]` — Detalle producto
- `/blog`, `/blog/[slug]`
- `/donde-comprar`, `/soporte`, `/contacto`

## Contenido bilingüe (JSON)

Cada ítem en `data/*.json` usa español por defecto y traducciones en:

```json
"translations": {
  "en": {
    "name": "English name",
    "description": "..."
  }
}
```

El adaptador CMS aplica el locale automáticamente (`getProducts({ locale: 'en' })`).

## Hero slider (imágenes por idioma)

Configura 3 slides en `data/hero-slides.json`. Cada slide tiene rutas separadas para español e inglés:

```
public/images/hero/es/slide-1.jpg … slide-3.jpg
public/images/hero/en/slide-1.jpg … slide-3.jpg
```

Recomendado: imágenes **panorámicas** (aprox. 16:9 o más ancho), mínimo **1920×560px** para cubrir pantalla completa.

## Próximos pasos (CMS)

1. Implementar `sanity-adapter.ts` con el mismo esquema de localización.
2. Filtrar productos por `countryCode` según geolocalización o selector.
