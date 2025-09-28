"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth/auth-client";
import { useState } from "react";
import { Spinner } from "../spinner";

export default function LogInWithGoogle() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    const { data, error } = await authClient.signIn.social(
      {
        provider: "google",
        callbackURL: "/",
      },
      {
        onRequest: (ctx) => {
          // show Loading
          setIsLoading(!isLoading);
        },
        onError: (ctx) => {
          // display the error message and redirect to error page
          console.log("Error while sign", ctx.error);
          setIsLoading(!isLoading);
        },
      }
    );
  };
  return (
    <Button
      className="flex justify-between gap-x-3"
      variant="secondary"
      disabled={isLoading}
      onClick={() => handleSubmit()}
    >
      Sign in with Google
      {isLoading && <Spinner variant="default" />}
    </Button>
  );
}
