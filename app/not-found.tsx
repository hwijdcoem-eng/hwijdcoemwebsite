import Link from "next/link";
import { Button } from "../components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="font-glitch text-crimson text-6xl md:text-8xl mb-8 animate-pulse">
        404
      </div>
      <h2 className="font-display text-2xl md:text-4xl text-ink uppercase mb-6">
        Sector Not Found
      </h2>
      <p className="font-ui text-steel text-lg max-w-md mx-auto mb-10">
        The requested coordinates do not exist in this database. Return to the primary node.
      </p>
      <Link href="/">
        <Button variant="outline">
          RETURN TO BASE
        </Button>
      </Link>
    </div>
  );
}
