import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PAGES } from "../../data.const";

export default async function LibrairyPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const slug = params.slug;

  const page = PAGES.find((p) => p.slug === slug);

  if (!page) {
    notFound();
  }

  return (
    <Card>
      {" "}
      <CardTitle className="p-4">{slug}</CardTitle>
      <CardContent className="gap-4 mt-4 flex flex-col">
        <div>{page?.description}</div>

        <Link href={page?.url}>Voir la doc</Link>
      </CardContent>
      <CardFooter>
        <Button>
          <Link href="/exercises/m1-fundamentals/2.params-routing/code/">
            Back
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
