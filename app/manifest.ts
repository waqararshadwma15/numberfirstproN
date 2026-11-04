import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Numbers First — Bookkeeping & Financial Advisory",
    short_name: "Numbers First",
    description:
      "Monthly bookkeeping, VAT and Zakat filing, ZATCA e-invoicing, payroll (WPS) and financial advisory for Saudi SMEs.",
    start_url: "/",
    display: "standalone",
    background_color: "#0F1417",
    theme_color: "#0F1417",
    icons: [
      { src: "/assets/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/assets/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
