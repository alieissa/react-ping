import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import App from './App'
import initializeSocket from './socket'
import './index.css'



/* App is kicked-off only after connection to server and receiving init state
// Once connection is made all the dispatchers are registered. See socket.js
// This hoopla is needed to in order to map state to canvas props while having
// async store initialization
*/
initializeSocket((store) => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>
    , document.getElementById('root')
  );
})
