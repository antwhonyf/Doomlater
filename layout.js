import "./globals.css";

export const metadata = {
  title: "Tienda & Servicio Técnico",
  description: "Catálogo, citas de taller y panel de finanzas",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="bg-zinc-950 text-zinc-100 antialiased">{children}</body>
    </html>
  );
}