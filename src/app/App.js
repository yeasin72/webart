import React from "react"
import Canvas from "../Components/Canvas/Canvas";
import ToolBar from "../Components/ToolBar/ToolBar";
import TopBar from "../Components/TopBar/TopBar";
import '../Styles/app/app.css'

function App() {
  return (
    <div className="App">
      <TopBar />
      <ToolBar />
      <Canvas />
    </div>
  );
}

export default App;
    