import { Head } from "@inertiajs/react";

export default function Seo({ title, description, image, url, keywords = "" }) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: "Nile Photography",
        image,
        url,
        description,
        serviceType: "Photography",
        areaServed: "Germany",
    };

    return (
        <Head>
            <title>{title}</title>

            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="robots" content="index, follow" />

            {/* Open Graph */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:url" content={url} />
            <meta property="og:site_name" content="Nile Photography" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {/* Canonical */}
            <link rel="canonical" href={url} />

            {/* Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(schema),
                }}
            />
        </Head>
    );
}
