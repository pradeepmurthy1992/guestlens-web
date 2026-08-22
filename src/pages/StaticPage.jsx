import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Container from "../components/ui/Container";

export default function StaticPage({ title, updated, children }) {
  return (
    <>
      <Navbar />
      <main className="py-20 md:py-28">
        <Container className="max-w-2xl">
          <h1 className="font-display text-3xl text-ink md:text-4xl">{title}</h1>
          {updated && <p className="mt-2 text-xs text-muted-2">Last updated {updated}</p>}
          <div className="mt-8 flex flex-col gap-4 text-sm leading-relaxed text-muted [&_h2]:mt-8 [&_h2]:mb-1 [&_h2]:font-display [&_h2]:text-lg [&_h2]:text-ink [&_h2:first-child]:mt-0 [&_strong]:text-ink [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-1.5">
            {children}
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
