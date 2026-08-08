import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Container from "../components/ui/Container";

export default function StaticPage({ title, children }) {
  return (
    <>
      <Navbar />
      <main className="py-20 md:py-28">
        <Container className="max-w-2xl">
          <h1 className="font-display text-3xl text-ink md:text-4xl">{title}</h1>
          <div className="mt-8 flex flex-col gap-4 text-sm leading-relaxed text-muted">
            {children}
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
