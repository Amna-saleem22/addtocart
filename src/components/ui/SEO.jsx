import { Helmet } from "react-helmet-async";

const SEO = ({
  title,
  description,
  keywords,
  image,
  url,
  type = "website",
  product,
  breadcrumbs,
}) => {
  const siteName = "LUXE Couture";
  const defaultDesc = "LUXE Couture — Premium South Asian Fashion. Shop Shalwar Kameez, Lehenga, Sherwani & more. Free delivery on orders over PKR 5,000.";
  const defaultImg = "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1200&q=80";
  const baseUrl = "https://luxecouture.replit.app";

  const pageTitle = title ? `${title} | ${siteName}` : `${siteName} — Premium South Asian Fashion`;
  const pageDesc = description || defaultDesc;
  const pageImg = image || defaultImg;
  const pageUrl = url ? `${baseUrl}${url}` : baseUrl;

  const productSchema = product ? {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images,
    description: product.description,
    brand: { "@type": "Brand", name: product.brand },
    offers: {
      "@type": "Offer",
      priceCurrency: "PKR",
      price: product.price,
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: { "@type": "Organization", name: siteName },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviews,
    },
  } : null;

  const breadcrumbSchema = breadcrumbs ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((b, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: b.label,
      item: `${baseUrl}${b.href}`,
    })),
  } : null;

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    name: siteName,
    url: baseUrl,
    logo: `${baseUrl}/logo192.png`,
    description: defaultDesc,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lahore",
      addressCountry: "PK",
    },
  };

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDesc} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={pageUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDesc} />
      <meta property="og:image" content={pageImg} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_PK" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDesc} />
      <meta name="twitter:image" content={pageImg} />
      <meta name="twitter:site" content="@luxecouture" />

      {/* Schema.org */}
      <script type="application/ld+json">{JSON.stringify(orgSchema)}</script>
      {productSchema && (
        <script type="application/ld+json">{JSON.stringify(productSchema)}</script>
      )}
      {breadcrumbSchema && (
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      )}
    </Helmet>
  );
};

export default SEO;
