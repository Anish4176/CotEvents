import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-[100%] flex flex-col justify-center items-center">     
      <Header />
      <main className="w-[100%] flex flex-col justify-center items-center">{children}</main>
      <Footer />
    </div>
  );
}
