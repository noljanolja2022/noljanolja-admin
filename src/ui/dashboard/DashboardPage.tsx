import React from 'react';
import AuthService from '../../service/AuthService';
import UserService from '../../service/UserService';
import { signOut } from 'firebase/auth';
import { firebaseAuthInstance } from '../../service/FirebaseService';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div>
      <p className="text-red-500 ">Hey there. If you see this, it means you are logged in</p>
      <button className='border-1 bg-yellow-200 p-2 rounded-md' onClick={() => {
        AuthService.clearToken();
        UserService.saveUser();
        signOut(firebaseAuthInstance).then(() => {
          navigate('/login', { replace: true })
        }).catch(err => {
          alert(err)
        })
      }}>Logout </button>
    </div>
  )
}

export default Dashboard;
