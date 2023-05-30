import Navbar from "./components/Navbar";
import Section from "./components/Section";
import Footer from "../(home)/components/Footer";

export default function Home() {
  return (
    <>
      <main className="flex min-h-screen flex-col">
        <Navbar />
        <Section />
      </main>
      <Footer />
    </>
  );
}
