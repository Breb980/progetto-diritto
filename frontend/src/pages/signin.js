/* The login page */
import React from "react";
import SigninForm from "@/components/auth/signinForm";

export default function SigninPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <SigninForm />
    </div>
  );
}
