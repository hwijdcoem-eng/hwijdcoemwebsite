"use client";

import { useEffect } from "react";
import { Button } from "../components/ui/Button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="font-glitch text-crimson text-6xl md:text-8xl mb-8 animate-pulse">
        ERR_500
      </div>
      <h2 className="font-display text-2xl md:text-4xl text-ink uppercase mb-6">
        System Malfunction Detected
      </h2>
      <p className="font-ui text-steel text-lg max-w-md mx-auto mb-10">
        A critical error occurred while attempting to process the request. The tactical link has been severed.
      </p>
      <Button onClick={() => reset()} variant="outline">
        REBOOT LINK
      </Button>
    </div>
  );
}
