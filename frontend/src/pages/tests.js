import axios from "axios";
import { useState} from "react";

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

export default function TestPage() {
  // users: state of users
  // setUsers: function for update the state 
  const [users, setUsers] = useState([]);
  const [datas, setDatas] = useState([]);

   // CALL the backend
  const fetchUsers = async () => {
    try {
      const res = await axios.get(API_URL + "/users");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchVotes = async () => {
    try {
      const res = await axios.get(API_URL + "/vote/stat");
      setDatas(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
      <div style={{ padding: "20px" }}>
        <h1>Robe nel Database</h1>
        <button onClick={fetchUsers}>Carica utenti</button>
        <ul>
          {users.map((u) => (
            <li key={u.cf}>
              {u.cf} - {u.name}
            </li>
          ))}
        </ul>
        <button onClick={fetchVotes}>Carica voti</button>
        <ul>
          {datas.map((u) => (
            <li key={u.choice}>
              {u.choice} - {u.count}
            </li>
          ))}
        </ul>
      </div>
  )
}
/*<button onClick={toggleSidebar} className={`${buttons.btn} ${buttons["secondary"]} ${buttons["medium"]}`}>
      {sidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
    </button>*/