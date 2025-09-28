import { authClient } from "@/lib/auth/auth-client";

await authClient.signIn.social({
  provider: "google",
  // url to redirect on successful signin
  callbackURL: "/",
  // A URL to redirect if an error occurs during the sign in process
  errorCallbackURL: "/error",
  // A URL to redirect if the user is newly registered
  newUserCallbackURL: "/",
  // disable the automatic redirect to the provider. default is false
  disableRedirect: true,
});
