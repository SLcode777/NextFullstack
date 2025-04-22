import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function RoutingCodeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Layout UI */}
        {/* Place children where you want to render a page or nested layout */}
        <Card className=" bg-accent">
          <CardHeader className="font-bold text-xl ">
            Page layout.tsx
          </CardHeader>
          <CardContent>{children}</CardContent>
        </Card>
      </body>
    </html>
  );
}
