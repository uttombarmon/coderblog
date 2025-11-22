import NavBar from "@/components/custom/layout/public/NavBar";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div>
        <NavBar />
      </div>
      {children}
    </div>
  );
}
