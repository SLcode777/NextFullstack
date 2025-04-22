import { Card, CardContent, CardTitle } from "@/components/ui/card";

export default function ParamsRoutingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Card className="p-4">
      <CardTitle className="mb-4">ParamsRouting Layout</CardTitle>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
