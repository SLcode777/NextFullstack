import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { PAGES } from "../data.const";

export default function ParamsRoutingPage() {
  const PageList = PAGES;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pages : </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {/* <ul> */}
        {PageList.map((page) => (
          <Link
            className="text-indigo-500 hover:underline"
            href={`/exercises/m1-fundamentals/2.params-routing/code/${page.slug}`}
          >
            {page.slug}
          </Link>
        ))}
        {/* </ul> */}
      </CardContent>
    </Card>
  );
}
