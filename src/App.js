import React from "react";
import Draggable from "./Draggable";
import Draggable2 from "./Draggable2";
import classes from "./App.module.css";

function App() {
  return (
    <div className={classes.App}>
      <Draggable>
        <div className={classes.box}>타겟</div>
      </Draggable>
      {/* <Draggable2>
        <div className={classes.box}>타겟</div>
      </Draggable2> */}
    </div>
  );
}

export default App;
