/* The signin page */
import React from "react";
import SigninForm from "@/components/auth/signinForm";

/**
 * create signin page wraping SigninForm
 * @returns {JSX.Element}
 */
export default function SigninPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <SigninForm />
    </div>
  );
}
