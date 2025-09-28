import LogInWithGoogle from "@/components/sign-in/google-login";
import { auth } from "@/lib/auth/auth-server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default async function SignIn() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/");
  }

  console.log("session is", JSON.stringify(session));
  return (
    <div className="flex justify-center items-center h-screen">
      <LogInWithGoogle />
    </div>
  );
}
