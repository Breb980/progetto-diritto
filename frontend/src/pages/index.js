import TextPage from "@/components/layouts/textPage"
import Button from "@/components/ui/button";
import { useAuth } from "@/utils/authContext";
import styles from "@/styles/layout.module.css";


/** Homepage
 *  
 *  @returns {JSX.Element}
*/
export default function Home() {
  const { login } = useAuth();
  // if the try went well, RETURN the users list 
  return ( 
    <TextPage api_url="/text/home" title="Benvenuto nella piattaforma di voto" subtitle="Strategie per Truccare il voto">
      <br />
      <h2><p style={{  color: "#555" }}>Prove sperimentali</p></h2>
      <div className={styles.contentPage} style={{color: "#444"}}> 
      <p>Come test, è possibile accedere col account dell'utente privileggiato</p>
      <Button label="Accedi come Giantino Mastrazzi" variant="primary" 
        click={async () => await login({ cf: "MSTGTN90A01H501A", psw: "password4", name: "Giantino", surname: "Mastrazzi" })}/>
      <p>Ora Giantino può votare col pulsante "Vota!" che si differenzia dagli altri utenti: può votare tutte le vote che vuole.
        Mentre Giovanni Frizzigoni non dispone di vantaggi e voterà solo una volta col pulsante "Vota". 
        Come menzionato sopra, in questa implementazione è lato frontend che avviene il trucco.
      </p>
      <Button label="Accedi come Giovanni Frizzigoni" variant="primary" 
        click={async () => await login({ cf: "FRZGVN90A01H501F", psw: "password5", name: "Giovanni", surname: "Frizzigoni" })}/>
      <p>Dalla barra laterale è possibile osservare i grafici che mostrano gli esiti delle votazioni. 
        Nel menù è presente la voce "Barra Truccata" che manomette i voti solo dopo averli estratti dalla struttura dati, 
        il conteggio viene modificato a vantaggio del Candidato A.
      </p>
      </div>
    </TextPage>
  );
}
