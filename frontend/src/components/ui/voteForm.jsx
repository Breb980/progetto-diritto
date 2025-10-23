import React, { useState } from "react";
import { useRouter } from "next/router"; 
import Button from "@/components/ui/button";
import { InputGroup, InputLeft, InputSelect } from "@/components/ui/inputGroup";
import { handleVoteSubmit } from "@/utils/submits";
import { useAuth } from "@/utils/authContext";

export default function VoteForm() {

    const router = useRouter();
    const { user } = useAuth();

    const [choice, setChoice] = useState("");
    const [message, setMessage] = useState("");

    /* getter for result*/
    const [result, setResult] = useState(null);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await handleVoteSubmit(user.cf, choice);
        console.log(result);
        setResult(result); //save the result
        setMessage(result.message);

        // if the vote its ok
        if (result.success) {
            alert("Hai votato!");
            // rederict to home
            setTimeout(() => { router.push("/"); }, 1000);
        }
    };

    return (
        <form style={{ width: "300px", margin: "2rem auto" }} onSubmit={handleSubmit}>
            <h2>Votazione</h2>
            <InputGroup>
                <InputLeft>@</InputLeft>
                <InputSelect 
                    value={choice}
                    options={[
                        { value: "it", label: "Italia" },
                        { value: "fr", label: "Francia" },
                        { value: "de", label: "Germania" },
                    ]}
                    onChange={(e) => setChoice(e.target.value)}
                />
            </InputGroup>
            <br />
            <div style={{ display: "flex", gap: "12px"}}>
                <Button label="Invia voto" variant="outline" type="submit"/>
                <Button label="Annulla" click={(e) => {e.preventDefault(); router.push("/");}} variant="secondary"/>
            </div>
            <br />
            {message && <p style={{ marginTop: "1rem", color: result.success ? "green" : "red", marginTop: "1rem", }}>{message}</p>}
        </form>
       
    ); //<p> <a href="/candidati">Non sai chi votare? informati</a> </p>
}