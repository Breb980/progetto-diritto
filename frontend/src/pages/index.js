import axios from "axios";
//useState: memorize local state in the page
import { useState } from "react";

import Button from "@/components/ui/button";
import Layout from "@/components/layouts/layout"

//GETTER from backend
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://backend:5000";

// used for test
export const getUsers = async () => {
  try {
    const res = await axios.get(`${API_URL}/users`);
    return res.data;
  } catch (err) {
    console.error("Error fetching users:", err);
    return [];
  }
};

/** Homepage
 *  
 *  @returns {JSX.Element}
*/
export default function Home() {
  // users: state of users
  // setUsers: function for update the state 
  const [users, setUsers] = useState([]);

  // CALL the backend
  const fetchUsers = async () => {
    try {
      const res = await axios.get(API_URL + "/users");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  // if the try went well, RETURN the users list 
  return (
    <Layout>
    <div style={{ padding: "20px" }}>
      <h1>Utenti dal Database</h1>
      <button onClick={fetchUsers}>Carica utenti</button>
      <ul>
        {users.map((u) => (
          <li key={u.cf}>
            {u.cf} - {u.name}
          </li>
        ))}
      </ul>
      <h1>Benvenuto nella piattaforma di voto</h1>
        <Button label="Invia" click={() => alert("Hai votato!")}/>
        <Button label="Annulla" variant="secondary" size="small"/>
        <Button label="Profilo" variant="outline"/>
    </div>
     </Layout>
  );
}
