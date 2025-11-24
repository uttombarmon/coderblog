import { Footer } from "@/components/custom/layout/Footer";
import { Header } from "@/components/custom/layout/Header";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
