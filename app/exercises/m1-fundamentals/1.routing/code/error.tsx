"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  const router = useRouter();

  return (
    <Card>
      <Alert
        variant="destructive"
        className="bg-background flex flex-col gap-3"
      >
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Something went wrong !</AlertDescription>

        <Button variant="outline" onClick={() => reset()}>
          Try again
        </Button>
        <Button variant="outline" onClick={router.back}>
          Back
        </Button>
      </Alert>
    </Card>
  );
}
