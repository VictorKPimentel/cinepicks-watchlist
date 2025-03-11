import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import Home from './pages/Home';
import Watchlist from './pages/Watchlist';
import Profile from './pages/Profile';
import MovieDetailsModalWindow from './components/modals/MovieDetailsModalWindow';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home/>} />
            <Route path="myWatchlist" element={<Watchlist/>} />
            <Route path="profile" element={<Profile/>} />
          </Route>
        </Routes>
      </BrowserRouter>

      {/* The modal is always rendered but only visible when open */}
      <MovieDetailsModalWindow />
    </>
  )
}

export default App
