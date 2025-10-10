/* submit for login, 
   return {success, message} from invoker */

import api from "@/utils/api";

export const handleLoginSubmit = async (cf, psw) => {
    try {
        const res = await api.post("/login", { cf, psw });
        const data = res.data;

        if (data.success) {
            return { success: true, user: data.user, message: "✅ Login effettuato con successo!" };
        }
    } catch (err) {
        console.error("Errore di rete:", err);
        if (err.response) { // capture errors HTTP from server (es. 401)
            return {
                success: false,
                message: `❌ ${err.response.data?.error || "Credenziali non valide"}`,
            };
        } else if (err.request) { // sent request but no response from server
            return { success: false, message: "❌ Nessuna risposta dal server" };
        } else { // others errors (Axios configurations ecc.)
            return { success: false, message: "❌ Errore di connessione al server" };
        }
    }
};
//return data;


/* TODO: submit for vote */
