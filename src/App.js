import { useContext } from 'react';
import './App.css';
import Characters from './components/Characters';
import Header from './components/Header';
import ThemeContext from './context/ThemeContext';

function App() {

  const {theme, setTheme} = useContext(ThemeContext)
  
  const headTheme = theme
  ? "bg-blue-700"
  : "bg-white"
  
  return (
    <div className={"App " + headTheme}>
      <Header />
      <Characters />
    </div>
  );
}

export default App;
