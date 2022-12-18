import logo from './logo.svg';
import './App.css';
import ListEmployees from './components/ListEmployees';
import { Link, NavLink, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConsultEmployee from './components/ConsultEmployee';
import DetailEmployee from './components/DetailEmployee';


function App() {
  return (
    <>
      <div class="bg-orange py-2">
        <ul class="nav justify-content-center text-dark text-decoration-none">
          <li class="nav-item">
            <NavLink activeClassName='activesNav' class=" text-decoration-none " to="/Home"><i class="fa-solid fa-house me-2"></i>Home</NavLink>
          </li>
          <li class="nav-item ms-2">
            <NavLink activeClassName='activesNav' class="  text-decoration-none  " to="/Consultarme"><i class="fa-solid fa-earth-americas me-2"></i>Consultarme</NavLink>
          </li>

          {/* <li class="nav-item">
            <NavLink activeClassName='activesNav' class="nav-link text-decoration-none" to="/Consultarme"> <i class="fa-solid fa-earth-americas"></i> Consultarme</NavLink>
          </li> */}

        </ul>

      </div>


      <Switch >


        <Route exact path={'/Consultarme'} >
          <ConsultEmployee />
        </Route>
        <Route strict exact path={'/Home'} >
          <ListEmployees />
        </Route>


        <Route strict exact path={'/EditEmploye/:id'} >
            <DetailEmployee />
        </Route>

      </Switch>

      <ToastContainer/>



    </>
  );
}

export default App;
