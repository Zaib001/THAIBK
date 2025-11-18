

export const metadata = {
  title: "THAIBK",
  description: "Live · Learn · Belong"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-amanSand text-amanCharcoal">
        {children}
      </body>
    </html>
  );
}
