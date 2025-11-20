import React, { useState, useEffect } from "react";
import { useRouter } from "next/router"; 
import Button from "@/components/ui/button";
import { InputGroup, InputLeft, InputSelect } from "@/components/ui/inputGroup";
import { handleVoteSubmit } from "@/utils/submits";
import { useAuth } from "@/utils/authContext";
import { handleGetOptions } from "@/utils/requests";

export default function VoteForm() {

    const router = useRouter();
    const { user } = useAuth();

    const [choice, setChoice] = useState("");
    const [message, setMessage] = useState("");

    /* getter for result*/
    const [result, setResult] = useState(null);

    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(true);

    // getter for options
    useEffect(() => {
        async function fetchOptions() {
            const res = await handleGetOptions();
            if (res.success) setOptions(res.options);
            if (!res.success) console.error("opzioni non trovate");
            setLoading(false);
        }
        fetchOptions();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Choice inviata al backend:", choice);
        const result = await handleVoteSubmit(user.cf, choice);
        ///console.log(result);
        setResult(result); //save the result
        setMessage(result.message);

        // if the vote its ok
        if (result.success) {
            alert("Hai votato!");
            // rederict to home
            setTimeout(() => { router.push("/"); }, 1000);
        }
    };

    if (loading) return <p>Caricamento opzioni...</p>;

    return (
        <form style={{ width: "300px", margin: "2rem auto" }} onSubmit={handleSubmit}>
            <h2>Votazione</h2>
            <InputGroup>
                <InputLeft>
                    <img width="20" height="20" src="https://img.icons8.com/external-flat-icons-inmotus-design/67/external-box-vote-elections-flat-icons-inmotus-design-2.png" alt="external-box-vote-elections-flat-icons-inmotus-design-2"/>
                </InputLeft>
                <InputSelect 
                    value={choice}
                    options={options}
                    onChange={(e) => { console.log("Nuova scelta:", e.target.value); setChoice(e.target.value)}}
                />
            </InputGroup>
            <br />
            <div style={{ display: "flex", gap: "12px"}}>
                <Button label="Invia voto" variant="outline" type="submit"/>
                <Button label="Annulla" click={(e) => {e.preventDefault(); router.push("/");}} variant="secondary"/>
            </div>
            <br />
            <p> <a href="/candidates">Non sai chi votare? informati</a> </p>
            {message && <p style={{ marginTop: "1rem", color: result.success ? "green" : "red", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                {result.success 
                ? <img width="22" height="22" src="https://img.icons8.com/color/48/checkmark--v1.png" alt="checkmark--v1"/>
                : <img width="22" height="22" src="https://img.icons8.com/color/48/delete-sign--v1.png" alt="delete-sign--v1"/>
                } 
                {message}</p>}
        </form>
       
    ); //<p> <a href="/candidati">Non sai chi votare? informati</a> </p>
}