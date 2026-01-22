/* All requests are defined here */

import api from "@/utils/api";

/**
 * Callback function for intermediate frontend and backend during a vote - submit for login
 *
 * @param {string} cf - User CF 
 * @param {string} psw - User password
 * @returns {Object} - {Boolean: success, Object: user data only success is true, string: message}
 * */
export const handleGetOptions = async () => {
     try {
        const res = await api.get("/text/candidates");
        const data = res.data;

        return {success: true, options: data.options};

    } catch (err) {
        console.error("Errore di rete:", err);
        if (err.response) { // capture errors HTTP from server (es. 401)
            return { success: false };
        } else if (err.request) { // sent request but no response from server
            return { success: false };
        } else { // others errors (Axios configurations ecc.)
            return { success: false };
        }
    }
}