import logo from './logo.svg';
import './App.css';
import Dropzone from './components/dropzone/dropzone';
import { useEffect } from 'react';

function App() {
  useEffect(()=>{
    document.title = 'Removedor de fundo';
  })
  return (
    <div className="App">
      <header className="App-header">
        <Dropzone></Dropzone>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Repositório <code>https://github.com/Thiago-CSantos/starter-react.js</code>.
        </p>

      </header>
    </div>
  );
}

export default App;
