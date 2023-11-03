import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { imagesContext, userContext } from './context/contextNames';
import { useEasyState } from 'react-easy-state-management';
 
 
function App() {
  
  const  [userstate , userDispatch ] = useEasyState(userContext)
  const [ImageSate , imageDispatch ] = useEasyState(imagesContext)

  useEffect(()=>{
    userDispatch({
    type:"name",
    payload:"Piyas",
    offline:true
  }) 
  imageDispatch({
    type:"username",
    payload:"Piyas",
    offline: false

  })
  userDispatch({
    type:"email",
    payload:"Piyas@gmail.com",
    offline:true
  })
 
  },[])


  console.log(userstate)



  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
