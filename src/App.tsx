import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useEasy, useEasyOffline } from "./context";

function App() {
  const [userstate, setState, showLoaderFnc] = useEasyOffline("userContext", {
    users: [],
    name: "",
  });

  const getData = () =>
    showLoaderFnc(async () => {
      try {
        setState({
          users: ["Piyas", "Hakim"],
          name: "Piyas",
        });
      } catch (error) {
        console.error("Error:", error);
      }
    });

  useEffect(() => {
    getData();
  }, []);

  console.log(userstate, "userstate m");

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
      {userstate.users.map((val: any, index: number) => {
        return <p key={index}>{val}</p>;
      })}
    </div>
  );
}

export default App;
