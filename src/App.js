import React from "react";
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CreateForm from './create-form/Create'
import Edit from './Edit/Edit'
import Home from './Home/Home'
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path='/' component={Home}></Route>
          <Route exact path='/create' component={CreateForm}></Route>
          <Route exact path='/update' component={Edit}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;


