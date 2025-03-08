import { Appbar } from "@/components/Appbar";
import { Footer } from "@/components/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Appbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
