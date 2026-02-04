import TextPage from "@/components/layouts/textPage"
import Button from "@/components/ui/button";
import { useAuth } from "@/utils/authContext";
import styles from "@/styles/layout.module.css";

// non dovrei farlo qua, serve per la demo
import { handleLoginSubmit } from "@/utils/submits";
//import { generateEd25519KeyPair } from "@/utils/signature";



/** Homepage
 *  
 *  @returns {JSX.Element}
*/
export default function Home() {
  const { login } = useAuth();
  // if the try went well, RETURN the users list 

  //const keys = generateEd25519KeyPair();
  

  return ( 
    <TextPage api_url="/text/home" title="Benvenuto nella piattaforma di voto" subtitle="Strategie per Truccare il voto">
      <br />
      <h2><p style={{ color: "#555" }}>Prove sperimentali</p></h2>
      <div className={styles.contentPage} style={{color: "#444"}}> 
      <p>Come test, è possibile accedere col account dell'utente privileggiato</p>
      <Button label="Accedi come Giantino Mastrazzi" variant="primary" 
        click={async () => {
          await login({ cf: "MSTGTN90A01H501A", psw: "password4", name: "Giantino", surname: "Mastrazzi" }, keys.privateKey);
          await handleLoginSubmit("MSTGTN90A01H501A", "password4", keys.publicKey);
        }}/>
      <p>Ora Giantino può votare col pulsante "Vota!" che si differenzia dagli altri utenti: può votare tutte le vote che vuole.
        Mentre Giovanni Frizzigoni non dispone di vantaggi e voterà solo una volta col pulsante "Vota". 
        Come menzionato sopra, in questa implementazione è lato frontend che avviene il trucco.
      </p>
      <Button label="Accedi come Giovanni Frizzigoni" variant="primary" 
        click={async () => {
          const res = await fetch('/api/keys', { method: 'POST' });
          const { publicKey, privateKey } = await res.json();
          //console.log(publicKey)
          await login({ cf: "FRZGVN90A01H501F", psw: "password5", name: "Giovanni", surname: "Frizzigoni" }, privateKey);
          await handleLoginSubmit("FRZGVN90A01H501F", "password5", publicKey);
        }}/>
      <p>Dalla barra laterale è possibile osservare i grafici che mostrano gli esiti delle votazioni. 
        Nel menù è presente la voce "Barra Truccata" che manomette i voti solo dopo averli estratti dalla struttura dati, 
        il conteggio viene modificato a vantaggio del Candidato A.
      </p>
      <p>Inoltre è possibile testare anche con altri utenti non privileggiati:</p>
      <Button label="Accedi come Mario Rossi" variant="primary" 
        click={async () => {
          const res = await fetch('/api/keys', { method: 'POST' });
          const { publicKey, privateKey } = await res.json();
          //console.log(publicKey)
          await login({ cf: "RSSMRA80A01H501U", psw: "password1", name: "Mario", surname: "Rossi" }, privateKey);
          await handleLoginSubmit("RSSMRA80A01H501U", "password1", publicKey);
        }}/>
        <p>
        <Button label="Accedi come Luigi Verdi" variant="primary" 
        click={async () => {
          const res = await fetch('/api/keys', { method: 'POST' });
          const { publicKey, privateKey } = await res.json();
          //console.log(publicKey)
          await login({ cf: "VRDLGI85B12H501T", psw: "password2", name: "Luigi", surname: "Verdi" }, privateKey);
          await handleLoginSubmit("VRDLGI85B12H501T", "password2", publicKey);
        }}/>
        </p>
        <p>
        <Button label="Accedi come Laura Bianchi" variant="primary" 
        click={async () => {
          const res = await fetch('/api/keys', { method: 'POST' });
          const { publicKey, privateKey } = await res.json();
          //console.log(publicKey)
          await login({ cf: "BNCLRA90C23H501Q", psw: "password3", name: "Laura", surname: "Bianchi" }, privateKey);
          await handleLoginSubmit("BNCLRA90C23H501Q", "password3", publicKey);
        }}/>
        </p>
      </div>
    </TextPage>
  );
}
