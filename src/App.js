
import { BrowserRouter,Routes,Route,Navigate} from 'react-router-dom';
import './App.css';
import Profile from './profilePage/profilePage';
import ProfIndex from './ProfileIndex/ProfileIndex';
import Admin from './Admin/admin';
import 'mapbox-gl/dist/mapbox-gl.css';

function App() {

  return (
    <div className="App">
        <div className="CoverBox">

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ProfIndex />} />
            <Route path="/profile/:name" element={<Profile />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
        </div>
        
    </div>
  );
}

export default App;
