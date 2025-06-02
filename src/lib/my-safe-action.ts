import {
  createSafeActionClient,
  DEFAULT_SERVER_ERROR_MESSAGE,
} from "next-safe-action";
import { getRequiredUser } from "./auth-session";

class MyCustomError extends Error {}

export const actionClient = createSafeActionClient({
  handleServerError(e) {
    console.error("Action error:", e.message);

    if (e instanceof MyCustomError) {
      return e.message;
    }

    return DEFAULT_SERVER_ERROR_MESSAGE;
  },
});

export const authActionClient = actionClient.use(async ({ next }) => {
  const user = await getRequiredUser();

  if (!user) {
    throw new Error("Session not found !");
  }

  return next({ ctx: { user } });
});
