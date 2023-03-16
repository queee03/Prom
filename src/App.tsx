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
      <header className="App-header">
        <span>{title}</span>
        <span>try `npm run storybook`</span>
      </header>
      <div className="App-body">
        原始上传方式
        <form
          method="post"
          encType="mulitipart/form-data"
          action="https://jsonplaceholder.typicode.com/posts"
        >
          <input type="file" />
          <button type="submit">Submit</button>
        </form>
        通过 API 上传
        <input
          type="file"
          onChange={(e) => {
            const { files } = e.target;
            if (files) {
              const uploadFile = files[0];
              const formData = new FormData();
              formData.append(uploadFile.name, uploadFile);
              axios
                .post('https://jsonplaceholder.typicode.com/posts', formData, {
                  headers: {
                    'Content-Type': 'mulitipart/form-data',
                  },
                })
                .then((res) => {
                  console.log(res);
                });
            }
          }}
        />
      </div>
    </div>
  );
}

export default App;
