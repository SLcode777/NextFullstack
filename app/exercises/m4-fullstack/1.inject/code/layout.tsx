import { headers } from "next/headers";
import { InjectUserAgent } from "./user-agent-store";
import { userAgent } from "next/server";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const userAgentResult = userAgent({ headers: headersList });
  console.log(userAgentResult);
  return (
    <>
      {children}
      <InjectUserAgent userAgent={userAgentResult} />
    </>
  );
}
