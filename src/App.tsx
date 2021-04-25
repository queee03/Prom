import React from "react";
import Button, { ButtonType, ButtonSize } from "./components/Button/button";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button disabled>Hello</Button>
        <Button type={ButtonType.Primary} size={ButtonSize.Large}>
          Hello
        </Button>
        <Button type={ButtonType.Link} href="http://www.baidu.com">
          Hello
        </Button>
        <p>
          Edit <code>src/App.js</code> and save to reload.
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
