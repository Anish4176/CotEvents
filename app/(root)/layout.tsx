import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="px-4 md:px-10 flex flex-col justify-center items-center">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
