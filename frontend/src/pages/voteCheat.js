/* The cheat voting page */
import React from "react";
import VoteFormCheat from "@/components/forms/voteFormCheat";

/**
 * create voting page wraping LoginForm
 * @returns {JSX.Element}
 */
export default function VotePageCheat() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <VoteFormCheat />
    </div>
  );
}