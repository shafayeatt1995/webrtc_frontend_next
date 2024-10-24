import Footer from "@/components/Footer";
import Nav from "@/components/Nav";

export default function HomeLayout({ children }) {
  return (
    <div>
      <Nav />
      {children}
      <Footer />
    </div>
  );
}
