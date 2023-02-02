// import React from "react";
import Button from "./components/Button";
import Menu from "./components/Menu";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Menu mode="horizontal">
          <Menu.Item index={0}>1</Menu.Item>
          <Menu.Item index={1}>2</Menu.Item>
        </Menu>
        <Button>Hello</Button>
        <Button disabled>disabled</Button>
        <Button type="primary" size="large">
          Large Button
        </Button>
        <Button type="danger" size="small">
          Small
        </Button>
        <Button type="link" href="http://www.baidu.com">
          Link
        </Button>
        <Button type="link" href="http://www.baidu.com" disabled>
          Link disabled
        </Button>
      </header>
      {/* <body>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </body> */}
    </div>
  );
}

export default App;
