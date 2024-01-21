import logo from './logo.svg';
import './App.css';
import { BrowserRouter ,Routes ,Route } from 'react-router-dom';
import Home from './Home';
import Loing from './Loing';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Loing/>}></Route>
          <Route path='/home' element={<Home/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
