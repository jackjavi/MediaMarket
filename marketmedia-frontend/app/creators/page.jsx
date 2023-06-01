import Navbar from "./components/Navbar";
import Section from "./components/Section";
import Footer from "../(home)/components/Footer";

export default function Home() {
  return (
    <main className="container mx-auto flex min-h-screen flex-col">
      <Navbar />
      <Section />
      <Footer />
    </main>
  );
}
