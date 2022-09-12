import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Topbar from './components/topbar';
import Welcome from './views/welcome';
import Address from './views/address';
import Confirmation from './views/confirmation';
import Woz from './views/woz';
import { AddressProvider } from './Context';
import './styles/App.css';

function App() {
  return (
    <div className="App">
    <AddressProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Welcome/>}/>
          <Route path='/*' element={
            <>
              <Topbar />
              <Routes>
                <Route path='address' element={<Address/>}/>
                <Route path='confirmation' element={<Confirmation/>}/>
                <Route path='woz' element={<Woz/>}/>
              </Routes>
            </>} />
        </Routes>
      </BrowserRouter>
    </AddressProvider>
    </div>
  );
}

export default App;