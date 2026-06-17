import { useContext } from 'react';
import UserContext from '../context/UserContext';

function Profile() {
  const { user } = useContext(UserContext);
  
  return (
    <div className="mt-5 text-lg font-semibold text-black dark:text-white transition-colors duration-300">
      {!user ? "Please Login" : `Welcome ${user.username}`}
    </div>
  );
}
export default Profile;