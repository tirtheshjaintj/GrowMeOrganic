import {Container, Typography} from '@mui/material';
import { useSelector } from 'react-redux';
import Navbar from "../components/Navbar";
import PostsTable from '../components/PostsTable';
import Checks from '../components/Checks';

function DashBoardPage() {
  const user=useSelector((state:any)=>state.user);
  return (
    <>
    <Navbar user={user}/>
    <Container
        sx={{
            display:"flex",
            paddingTop:"120px",
            flexDirection:"column",
            justifyContent:"start",
            alignItems:"center",
            minHeight: '100vh',
            color:"white",            
        }}
    >
      <PostsTable/>
      <br /><br />
      <Checks/>
    </Container>
    </>
);
}

export default DashBoardPage