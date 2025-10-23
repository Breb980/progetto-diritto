/* The login page */
import React from "react";
import LoginForm from "@/components/auth/loginForm";

/**
 * create login page wraping LoginForm
 * @returns {JSX.Element}
 */
export default function LoginPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <LoginForm />
    </div>
  );
}
