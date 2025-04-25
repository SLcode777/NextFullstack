"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePathname, useRouter } from "next/navigation";
// import { useRouter } from "next/router";
import { useState } from "react";

export default function SearchInput() {
  const [search, setSearch] = useState("");

  const router = useRouter();
  const pathname = usePathname();


  return (
    <Label>
      Search:
      <Input
        value={search}
        id="input"
        placeholder="Search"
        onChange={(e) => {
          setSearch(e.target.value);
          router.push(pathname + `?search=${e.target.value}`);
        }}
      />
    </Label>
  );
}
