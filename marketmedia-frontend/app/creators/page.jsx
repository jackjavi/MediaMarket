import Navbar from "./components/Navbar";
import Section from "./components/Section";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <Section />
    </main>
  );
}
