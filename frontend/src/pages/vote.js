/* The voting page */
import React from "react";
import VoteForm from "@/components/ui/voteForm";

/**
 * create voting page wraping LoginForm
 * @returns {JSX.Element}
 */
export default function VotePage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <VoteForm />
    </div>
  );
}