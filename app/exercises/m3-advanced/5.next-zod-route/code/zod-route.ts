import { getRequiredUser } from "@/lib/auth-session";
import { createZodRoute } from "next-zod-route";
import { NextResponse } from "next/server";

export const route = createZodRoute({});

export const userRoute = route
.use(async ({ next }) => {
  const user = await getRequiredUser();

  if (!user) {
    return NextResponse.json(
      { message: "you need to be logged in." },
      { status: 401 }
    );
  }
  return next({ ctx: { user } });
});
