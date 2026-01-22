/* All submits are defined here */

import api from "@/utils/api";

/**
 * Callback function for intermediate frontend and backend during a login - submit for login 
 *
 * @param {string} cf - User CF 
 * @param {string} psw - User password
 * @returns {Object} - {Boolean: success, Object: user data only success is true, string: message}
 * */
export const handleLoginSubmit = async (cf, psw, publicKey) => {
    try {
        const res = await api.post("/login", { cf, psw, publicKey});
        const data = res.data;

        if (data.success) {
            return { success: true, user: data.user, message: "Login effettuato con successo!" };
        }
    } catch (err) {
        console.error("Errore di rete:", err);
        if (err.response) { // capture errors HTTP from server (es. 401)
            return {
                success: false,
                message: `${err.response.data?.error || "Credenziali non valide"}`,
            };
        } else if (err.request) { // sent request but no response from server
            return { success: false, message: "Nessuna risposta dal server" };
        } else { // others errors (Axios configurations ecc.)
            return { success: false, message: "Errore di connessione al server" };
        }
    }
};

/* submit for signin */
/**
 * Callback function for intermediate frontend and backend during a signin - submit for signin
 *
 * @param {string} cf - User CF 
 * @param {string} name - User name 
 * @param {string} surname - User surname
 * @param {string} psw - User password
 * @returns {Object} - {Boolean: success, Object: user data only success is true, string: message}
 * */
export const handleSigninSubmit = async (cf, name, surname, psw, publicKey) => {
    try {
        const res = await api.post("/signin", { cf, name, surname, psw, publicKey });
        const data = res.data;

        if (data.success) {
            return { success: true, user: data.user, message: "Registrazione effettuata con successo!" };
        }
    } catch (err) {
        console.error("Errore di rete:", err);
        if (err.response) { // capture errors HTTP from server (es. 401)
            return {
                success: false,
                message: `${err.response.data?.error || "Dati inseriti non validi"}`,
            };
        } else if (err.request) { // sent request but no response from server
            return { success: false, message: "Nessuna risposta dal server" };
        } else { // others errors (Axios configurations ecc.)
            return { success: false, message: "Errore di connessione al server" };
        }
    }
};

/* submit for vote */
export const handleVoteSubmit = async (cf, choice, signature) => {
    try {
        const res = await api.post("/vote", { cf, choice, signature });
        const data = res.data;

        if (data.success) {
            return { success: true, message: "Voto effettuato con successo!" };
        }
    } catch (err) {
        console.error("Errore di rete:", err);
        if (err.response) { // capture errors HTTP from server (es. 401)
            return {
                success: false,
                message: `${err.response.data?.error || "Dati inseriti non validi"}`,
            };
        } else if (err.request) { // sent request but no response from server
            return { success: false, message: "Nessuna risposta dal server" };
        } else { // others errors (Axios configurations ecc.)
            return { success: false, message: "Errore di connessione al server" };
        }
    }
};


/* submit for cheat vote */
export const handleVoteSubmitCheat = async (cf, choice) => {
    try {
        const res = await api.post("/voteCheat", { cf, choice });
        const data = res.data;

        if (data.success) {
            return { success: true, message: "Voto effettuato con successo!" };
        }
    } catch (err) {
        console.error("Errore di rete:", err);
        if (err.response) { // capture errors HTTP from server (es. 401)
            return {
                success: false,
                message: `${err.response.data?.error || "Dati inseriti non validi"}`,
            };
        } else if (err.request) { // sent request but no response from server
            return { success: false, message: "Nessuna risposta dal server" };
        } else { // others errors (Axios configurations ecc.)
            return { success: false, message: "Errore di connessione al server" };
        }
    }
};