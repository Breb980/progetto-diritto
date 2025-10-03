import axios from "axios";
//useState: memorize local state in the page
import { useState } from "react";

// export default function Home() {
//   return (
//     <div style={{ textAlign: "center", marginTop: "50px" }}>
//       <h1>Finalmente funziona 🎉</h1>
//       <p>Sono felice, il frontend funziona!</p>
//     </div>
//   );
// }


//GETTER from backend
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://backend:5000";

export const getUsers = async () => {
  try {
    const res = await axios.get(`${API_URL}/users`);
    return res.data;
  } catch (err) {
    console.error("Error fetching users:", err);
    return [];
  }
};

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
    <div style={{ padding: "20px" }}>
      <h1>Utenti dal Database</h1>
      <button onClick={fetchUsers}>Carica utenti</button>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.id} - {u.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
