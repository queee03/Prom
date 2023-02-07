// import React from "react";
import Button from './components/Button';
import Menu from './components/Menu';
import Icon from './components/Icon';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Menu defaultOpenSubMenus={[2]}>
          <Menu.Item>Main 1</Menu.Item>
          <Menu.Item disabled>Main 2</Menu.Item>
          <Menu.SubMenu title="sub1">
            <Menu.Item>Sub 1</Menu.Item>
            <Menu.Item>Sub 2</Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu title="su2">
            <Menu.Item>Sub 1</Menu.Item>
            <Menu.Item>Sub 2</Menu.Item>
          </Menu.SubMenu>
          <Menu.Item>Main 3</Menu.Item>
        </Menu>
        <Icon icon="coffee" theme="primary" />
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
