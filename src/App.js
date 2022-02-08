import React, { useState } from "react";
import './App.css';
import EditorComponent from "./EditorComponent";

const initialState = {

}
function App() {
  const [globalState, setGlobalState] = useState(initialState);
  
  return (
    <div className="App">
      <header className="App-header">
        <EditorComponent/>
        <EditorComponent/>
      </header>
    </div>
  );
}

export default App;
