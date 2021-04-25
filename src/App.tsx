import React from "react";
import Button from "./components/Button/button";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button>Hello</Button>
        <Button disabled>disabled</Button>
        <Button styleType="primary" size="large">
          Large Button
        </Button>
        <Button styleType="danger" size="small">
          Small
        </Button>
        <Button styleType="link" href="http://www.baidu.com">
          Link
        </Button>
        <Button styleType="link" href="http://www.baidu.com" disabled>
          Link disabled
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
