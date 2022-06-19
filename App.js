import logo from './logo.svg';
import './App.css';
import {Home} from './Home';
import {Trainer} from './Trainer';
import {AgeGroups} from './AgeGroups';
import {Gender} from './Gender';
import {City} from './City';
import {Nationality} from './Nationality';
import {BrowserRouter, Route, Routes, Switch, NavLink, Router} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="App container">
      <h3 className="d-flex justify-content-center m-3">
        Trainer Cruds
      </h3>
      <nav className="navbar navbar-expand-sm bg-light navbar-dark">
        <ul className="navbar-nav">
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/home">
              Home
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/trainer">
              Add Trainer
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/gender">
              Add Gender
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/city">
              Add City
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/nationality">
              Add Nationality
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/agegroups">
              Add AgeGroups
            </NavLink>
          </li>
        </ul>
      </nav>

        <Routes>
          
        <Route path='/home' element={<Home/>} />
        <Route path='/trainer' element={<Trainer/>} />
        <Route path='/gender' element={<Gender/>} />
        <Route path='/city' element={<City/>} />
        <Route path='/nationality' element={<Nationality/>} />
        <Route path='/agegroups' element={<AgeGroups/>} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;