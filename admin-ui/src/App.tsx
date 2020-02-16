import React from 'react';
import logo from './logo.svg';
import './App.css';
import store from "./redux/store";
import {BrowserRouter as Router} from "react-router-dom";
import {Provider} from "react-redux";
import Main from "./App/Main";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
      <div className="App">
        <Router basename={process.env.PUBLIC_URL} >
          <Provider store={store}>
            <Main/>
          </Provider>
        </Router>
      </div>
  );
}

export default App;
