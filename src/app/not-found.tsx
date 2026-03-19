import Link from "next/link";
import { Gem } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-dark px-4 text-center">
      <Gem className="mb-4 animate-float text-gold" size={52} />
      <h1 className="font-heading text-4xl text-white">Page Not Found</h1>
      <p className="mt-2 text-zinc-300">The page you are looking for does not exist.</p>
      <Link
        href="/"
        className="mt-6 rounded-md border border-gold bg-gold px-5 py-2 font-semibold text-dark transition hover:bg-gold-light"
      >
        Back to Home
      </Link>
    </main>
  );
}

