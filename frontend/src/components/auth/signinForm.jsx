/* Define the form for login */
import React, { useState } from "react";
import { useRouter } from "next/router"; 
import Button from "@/components/ui/button";
import { InputGroup, InputLeft, InputRight, Input } from "@/components/ui/inputGroup";
import { handleSigninSubmit } from "@/utils/submits";
import { useAuth } from "@/utils/authContext";
import { generateEd25519KeyPair } from "@/utils/signature";


export default function LoginForm() {

    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);

    /* input states */
    const [cf, setCf] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [psw, setPassword] = useState("");
    const [message, setMessage] = useState("");

    /* getter for result*/
    const [result, setResult] = useState(null);

    const { login } = useAuth();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const keys = generateEd25519KeyPair();
        const result = await handleSigninSubmit(cf, name, surname, psw, keys.publicKey);
        console.log(result);
        setResult(result); //save the result
        setMessage(result.message);

        //if the auth its ok
        if (result.success) {
            login(result.user, keys.privateKey);
            // rederict to home
            setTimeout(() => { router.push("/"); }, 1000);
        }
    };

    return (
        <form style={{ width: "300px", margin: "2rem auto" }} onSubmit={handleSubmit}>
            <h2>Iscrizione</h2>
            <InputGroup>
                <InputLeft><img width="20" height="20" src="https://img.icons8.com/material-rounded/24/identification-documents.png" alt="cf"/></InputLeft>
                <Input type="text" placeholder="CF" value={cf} onChange={(e) => setCf(e.target.value)} />
            </InputGroup>
            <br />
            <InputGroup>
                <InputLeft><img width="20" height="20" src="https://img.icons8.com/ios-glyphs/30/user--v1.png" alt="user--v1"/></InputLeft>
                <Input type="text" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} />
            </InputGroup>
            <br />
            <InputGroup>
                <InputLeft><img width="20" height="20" src="https://img.icons8.com/ios-glyphs/30/user--v1.png" alt="user--v1"/></InputLeft>
                <Input type="text" placeholder="Cognome" value={surname} onChange={(e) => setSurname(e.target.value)} />
            </InputGroup>
            <br />
            <InputGroup>
                <InputLeft><img width="20" height="20" src="https://img.icons8.com/skeuomorphism/32/lock.png" alt="lock"/></InputLeft>
                <Input type={showPassword ? "text" : "password"} placeholder="Password" value={psw} onChange={(e) => setPassword(e.target.value)} />
                    <InputRight>
                        <button type="button" 
                            style={{ padding: "8px 8.5px", cursor: "pointer", borderRadius: "6px", backgroundColor: "#ffffffff", marginLeft: "-10px",
                                display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #ffffffff"
                            }} 
                            onClick={() => setShowPassword((prev) => !prev)}>
                                {showPassword ? <img width="20" height="20" src="https://img.icons8.com/ios-glyphs/30/visible--v1.png" alt="visible--v1"/> 
                                : <img width="20" height="20" src="https://img.icons8.com/ios-glyphs/30/invisible--v1.png" alt="visible--v1"/>}
                        </button>
                    </InputRight>
            </InputGroup>
            <br />
            <div style={{ display: "flex", gap: "12px"}}>
                <Button label="Iscriviti" variant="outline" type="submit"/>
                <Button label="Annulla" click={(e) => {e.preventDefault(); router.push("/");}} variant="secondary"/>
            </div>
            {message && <p style={{ marginTop: "1rem", color: result.success ? "green" : "red", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                {result.success 
                ? <img width="22" height="22" src="https://img.icons8.com/color/48/checkmark--v1.png" alt="checkmark--v1"/>
                : <img width="22" height="22" src="https://img.icons8.com/color/48/delete-sign--v1.png" alt="delete-sign--v1"/>
                } 
                {message}</p>}
        </form>
       
    );
}
