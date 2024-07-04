import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, createRoutesFromChildren, Route, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './store/store';
import LoginPage from './Pages/LoginPage';
import DashBoardPage from './Pages/DashBoardPage';

const router=createBrowserRouter(
  createRoutesFromChildren(
    <Route path="/" element={<App/>}>
      <Route path="" element={<DashBoardPage/>}/>
      <Route path="login" element={<LoginPage/>}/>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
<Provider store={store}>
   <RouterProvider router={router}/>
</Provider>
)
