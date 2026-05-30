import type { NextConfig } from 'next'

// Statischer Export: erzeugt einen out/-Ordner mit echten HTML-Dateien.
// Damit liefert Netlify (publish = "out") die Seiten direkt aus -> kein 404.
// Hinweis: headers()/rewrites() werden im Static-Export nicht unterstuetzt
// (Security-Header sind zusaetzlich im Root-Layout gesetzt; /admin liegt als
//  statische Datei unter out/admin/index.html).
const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // im Static-Export Pflicht (kein Image-Optimizer-Server)
    remotePatterns: [
      { protocol: 'https', hostname: 'assets.tina.io', port: '' },
      { protocol: 'https', hostname: 'res.cloudinary.com', port: '' },
    ],
  },
}

export default nextConfig
