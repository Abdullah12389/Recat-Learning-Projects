import { useState, useContext } from 'react';
import UserContext from '../context/UserContext';

function Login() {
  const [username, setUsername] = useState("");
  const { setUser } = useContext(UserContext);

  return (
    <div className="p-6 border rounded shadow-md bg-white dark:bg-gray-800 text-black dark:text-white transition-colors duration-300">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <input 
        type="text" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
        placeholder="Username" 
        className="border p-2 bg-gray-100 dark:bg-gray-700 text-black dark:text-white rounded"
      />
      <button 
        onClick={() => setUser({ username })} 
        className="ml-2 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
      >
        Submit
      </button>
    </div>
  );
}
export default Login;