import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useEasyState } from "./context";
 
 

function App() {
  const [userstate, userDispatch, showLoaderFnc] = useEasyState("userContext");

  const getData =()=> showLoaderFnc(async () => {
    try {
      let response = await fetch("https://jsonplaceholder.typicode.com/posts");
      let data = await response.json();
      userDispatch({
        type: "followers",
        payload:  data,
        offline: true,
      });

     
    } catch (error) {
      console.error("Error:", error);
    }
  })

  useEffect(() => {
    getData()
  }, []);

  console.log(userstate, "userstate");

  if (userstate?.loading) {
    return <h1>Loading.......</h1>;
  }

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
          {userstate.name}
          {userstate.name}
        </a>
      </header>
      {userstate?.followers?.map((val: any, index: number) => {
        return <p key={index}>{val.title}</p>;
      })}
    </div>
  );
}

export default App;
