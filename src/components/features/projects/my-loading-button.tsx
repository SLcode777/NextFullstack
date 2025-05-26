"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

interface MyLoadingButtonProps {
  children: React.ReactNode;
  loadingText?: string;
  icon?: React.ReactNode;
  loadingIcon?: React.ReactNode;
  className?: string;
}

export function MyLoadingButton({
  children,
  loadingText = "En cours...",
  icon,
  loadingIcon,
  className,
}: MyLoadingButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className={className}>
      <span className="flex items-center gap-2">
        {pending
          ? loadingIcon || <Loader2 className="h-4 w-4 animate-spin" />
          : icon}
        {pending ? loadingText : children}
      </span>
    </Button>
  );
}
