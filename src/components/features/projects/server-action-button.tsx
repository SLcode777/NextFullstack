"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useTransition } from "react";

interface ServerActionButtonProps {
  action: () => Promise<void>;
  children: React.ReactNode;
  icon?: React.ReactNode;
  loadingIcon?: React.ReactNode;
  loadingText?: string;
  className?: string;
}

export function ServerActionButton({
  action,
  children,
  icon,
  loadingIcon,
  loadingText = "En cours...",
  className,
}: ServerActionButtonProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      onClick={() => {
        startTransition(action);
      }}
      disabled={isPending}
      className={className}
    >
      <span className="flex items-center gap-2">
        {isPending ? loadingIcon || <Loader2 className="animate-spin" /> : icon}
        {isPending ? loadingText : children}
      </span>
    </Button>
  );
}
