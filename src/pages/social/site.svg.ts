import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/constants";

export function GET() {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-labelledby="title desc">
      <title id="title">${escapeXml(SITE_NAME)}</title>
      <desc id="desc">${escapeXml(SITE_DESCRIPTION)}</desc>
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f6f2ea" />
          <stop offset="45%" stop-color="#ecd8bc" />
          <stop offset="100%" stop-color="#8e4b2d" />
        </linearGradient>
      </defs>
      <rect width="1200" height="630" fill="url(#bg)" rx="40" ry="40" />
      <circle cx="1030" cy="110" r="120" fill="rgba(255,255,255,0.18)" />
      <circle cx="1110" cy="70" r="38" fill="rgba(255,255,255,0.42)" />
      <rect x="72" y="72" width="180" height="36" rx="18" fill="#fff7ee" opacity="0.92" />
      <text x="102" y="96" font-family="'Outfit Variable', Arial, sans-serif" font-size="18" letter-spacing="3" fill="#8e4b2d">ASTRONOMER</text>
      <text x="72" y="240" font-family="'Outfit Variable', Arial, sans-serif" font-size="88" font-weight="700" fill="#1f1d1a">${escapeXml(
        SITE_NAME
      )}</text>
      <text x="72" y="320" font-family="'Newsreader Variable', Georgia, serif" font-size="34" fill="#2d251d">${escapeXml(
        SITE_DESCRIPTION
      )}</text>
      <text x="72" y="540" font-family="'Outfit Variable', Arial, sans-serif" font-size="24" fill="#fffaf3">Static publishing base with search, feeds, taxonomy, and deploy seams.</text>
    </svg>
  `.trim();

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600"
    }
  });
}

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

