import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import Footer from './components/Footer/Footer';
import Home from './views/Home/Home';
import GameList from './views/GameList/GameList';
import Developers from './views/Developers/Developers';
import DeveloperDetails from './views/DeveloperDetails/DeveloperDetails';
import GameDetails from './views/GameDetails/GameDetails';
import GameCategories from './views/Categories/GameCategories'; 
import Admin from './views/Admin/Admin';
import AbmDevelopers from './views/AbmDevelopers/AbmDevelopers';
import Login from './views/Login/Login';
import Register from './views/Register/Register';
import { GameProvider } from './context/GameContext';
import { DeveloperProvider } from './context/DeveloperContext';
import { AuthProvider } from './context/AuthContext'; // Importa AuthProvider
import Unauthorized from './components/Unauthorized';
import SearchResults from './views/SearchResults/SearchResults';

function App() {
  return (
    <AuthProvider> {/* Envuelve la aplicación con AuthProvider */}
      <GameProvider> 
        <DeveloperProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gameList" element={<GameList />} />
            <Route path="/gameList/gameDetails/:id" element={<GameDetails />} />
            <Route path="/categories" element={<GameCategories />} />
            <Route path="/category/:genre" element={<GameCategories />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/developers" element={<Developers />} />
            <Route path="/developers/developerDetails/:id" element={<DeveloperDetails />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/developers" element={<AbmDevelopers />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/search" element={<SearchResults />} />
          </Routes>
          <Footer />
        </DeveloperProvider>
      </GameProvider>
    </AuthProvider>
  );
}

export default App;
