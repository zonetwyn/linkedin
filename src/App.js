import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import HomeComponent from './components/home/Home';

class App extends Component {
  render() {
    return (
      <div className="App">
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route 
              exact path="/"
              render={() => <Redirect to="/home" />} />
            <Route 
              path="/home"
              component={HomeComponent} />
          </Switch>
        </div>
      </BrowserRouter>
      </div>
    );
  }
}

export default App;
