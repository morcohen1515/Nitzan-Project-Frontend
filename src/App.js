import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"; 
import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/login";

//manager
import ManagerEmployee from "./components/manager/employees";
import MenuManager from "./components/manager/menumanager";
import ManagerListOfNanny from "./components/manager/listofnanny";
import ManagerListOfGuides from "./components/manager/listofguides";
import ManagerListOfPsycho from "./components/manager/listofpsychologists";
import NewEmployee from "./components/manager/newemployee";
//guide
import MenuGuide from "./components/guide/menuguide";
//nanny
import MenuNanny from "./components/nanny/menunanny";
//psycho
import MenuPsycho from "./components/psycho/menupsycho";

import Apartments from "./components/apartments";
import Apartment from "./components/apartment";
import NoteBook from "./components/notebook";
import Note from './components/note';


function App() {
  return (
    <div className="App">
      <Router> 
        <Route path="/" exact component={Login}/>
        {/* Manager        */}
        <Route path="/menumanager" exact component={MenuManager}/>
        <Route path="/employees" exact component={ManagerEmployee}/>
        <Route path="/listofguides" exact component={ManagerListOfGuides}/>
        <Route path="/listofnanny" exact component={ManagerListOfNanny}/>
        <Route path="/listofpsychologists" exact component={ManagerListOfPsycho}/>
        <Route path="/newemployee/" exact component={NewEmployee}/>
        {/* Guide        */}
        <Route path="/menuguide" exact component={MenuGuide}/>
        {/* Nanny        */}
        <Route path="/menunanny" exact component={MenuNanny}/>
        {/* Psycho        */}
        <Route path="/menupsycho" exact component={MenuPsycho}/>
        {/*         */}
        <Route path="/apartments" exact component={Apartments}/>
        <Route path="/apartment/:apartmentname" exact component={Apartment}/>
        <Route path="/notebook/:apartmentname" exact component={NoteBook}/>
        <Route path="/note/:apartmentname" exact component={Note}/>
      </Router>
    </div>
  );
}

export default App;
