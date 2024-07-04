import { Outlet } from 'react-router-dom';
import './App.css'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function App(){
  const user=useSelector((state:any)=>state.user);
    const navigate=useNavigate();
    useEffect(() => {
      if(!(user.name && user.email && user.phoneNumber!="0")){
        navigate("/login");
      }
      }, [user]);
  return (
    <>
<Outlet/>
    </>
  )
}

export default App
