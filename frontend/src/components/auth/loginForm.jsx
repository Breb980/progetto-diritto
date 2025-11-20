/* Define the form for login */
import React, { useState } from "react";
import { useRouter } from "next/router"; 
import Button from "@/components/ui/button";
import { InputGroup, InputLeft, Input, InputRight } from "@/components/ui/inputGroup";
import { handleLoginSubmit } from "@/utils/submits";
import { useAuth } from "@/utils/authContext";


export default function LoginForm() {

    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);

    /* input states */
    const [cf, setCf] = useState("");
    const [psw, setPassword] = useState("");
    const [message, setMessage] = useState("");

    /* getter for result*/
    const [result, setResult] = useState(null);
    const { login } = useAuth();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await handleLoginSubmit(cf, psw);
        console.log(result);
        setResult(result); //save the result
        setMessage(result.message);

        //if the auth its ok
        if (result.success) {
            login(result.user);
            // rederict to home
            setTimeout(() => { router.push("/"); }, 1000);
        }
    };

    return (
        <form style={{ width: "300px", margin: "2rem auto" }} onSubmit={handleSubmit}>
            <h2>Login</h2>
            <InputGroup>
                <InputLeft><img width="20" height="20" src="https://img.icons8.com/material-rounded/24/identification-documents.png" alt="cf"/></InputLeft>
                <Input type="text" placeholder="CF" value={cf} onChange={(e) => setCf(e.target.value)} />
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
                <Button label="Accedi" variant="outline" type="submit"/>
                <Button label="Annulla" click={(e) => {e.preventDefault(); router.push("/");}} variant="secondary"/>
            </div>
            <br />
            <p> <a href="/signin">Non sei iscritto? iscriviti subito</a> </p>
            {message && <p style={{ marginTop: "1rem", color: result.success ? "green" : "red", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                {result.success 
                ? <img width="22" height="22" src="https://img.icons8.com/color/48/checkmark--v1.png" alt="checkmark--v1"/>
                : <img width="22" height="22" src="https://img.icons8.com/color/48/delete-sign--v1.png" alt="delete-sign--v1"/>
                } 
                {message}</p>}
        </form>
       
    );
}
