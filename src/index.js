import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {store} from './store'
import {Converter} from "./components"
import "./styles/style.css"

const App = () => (
  <Provider store={store}>
  <Converter/>
  </Provider>
);

ReactDOM.render(<App/>,document.getElementById('root'))