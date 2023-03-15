import { useEffect, useState } from 'react';

import axios from 'axios';

import './App.css';

function App() {
  const [title, setTitle] = useState('');

  useEffect(() => {
    const postData = { title: 'Prom' };
    axios.post('https://jsonplaceholder.typicode.com/posts', postData).then((res) => {
      setTitle(res.data.title);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">{title}</header>
      <header className="App-header">try `npm run storybook`</header>
    </div>
  );
}

export default App;
