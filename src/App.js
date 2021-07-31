import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>This is Feature A added by Developer A</h1>
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
        <p>This is Feature B added by Developer B</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat,
          magnam totam. Rem atque illo nesciunt illum dolorem inventore dolores
          corrupti aspernatur dignissimos neque accusantium dolore cupiditate
          eligendi alias, voluptate provident!
        </p>
      </header>
    </div>
  );
}

export default App;
