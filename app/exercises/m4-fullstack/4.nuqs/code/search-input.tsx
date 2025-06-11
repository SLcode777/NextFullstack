"use client";

import { Input } from "@/components/ui/input";
import { parseAsString, useQueryState } from "nuqs";

export function SearchInput() {
  // 🦁 Utilise useQueryState pour le searchParams
  // 💡 Utilise shallow et throttleMs
  const [q, setQ] = useQueryState(
    "q",
    parseAsString
      .withDefault("")
      .withOptions({ shallow: false, throttleMs: 1000 })
  );

  return (
    <>
      <Input
        type="search"
        placeholder="Search..."
        // 🦁 Utilise les valeurs de retours de la query
        onChange={(e) => setQ(e.target.value)}
        value={q || ""}
        className="w-full"
      />
      <div>search : {q}</div>
    </>
  );
}
