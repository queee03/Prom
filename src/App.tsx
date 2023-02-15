import { useState } from 'react';

import Button from './components/Button';
import Icon from './components/Icon';
import Menu from './components/Menu';
import Transition from './components/Transition';

function App() {
  const [show, setShow] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <Menu mode="horizontal" defaultOpenSubMenus={['2']}>
          <Menu.Item>Main 1</Menu.Item>
          <Menu.Item disabled>Main 2</Menu.Item>
          <Menu.SubMenu title="Sub1">
            <Menu.Item>Sub 1</Menu.Item>
            <Menu.Item>Sub 2</Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu title="Sub2">
            <Menu.Item>Sub 1</Menu.Item>
            <Menu.Item>Sub 2</Menu.Item>
          </Menu.SubMenu>
          <Menu.Item>Main 3</Menu.Item>
        </Menu>
        <Button onClick={() => setShow(!show)}>
          <Icon icon="coffee" theme="primary" />
        </Button>
        <Transition in={show} animation="zoom-in-top" timeout={300} wrapper>
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <Button>Hello</Button>
        </Transition>
      </header>
    </div>
  );
}

export default App;
