import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Cast from './pages/Cast';
import Result from './pages/Result';
import History from './pages/History';
import Lore from './pages/Lore';
import LostItem from './pages/LostItem';
import LostResult from './pages/LostResult';
import QimenPage from './pages/QimenPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/cast" element={<Cast />} />
          <Route path="/result" element={<Result />} />
          <Route path="/history" element={<History />} />
          <Route path="/lore" element={<Lore />} />
          <Route path="/lost-item" element={<LostItem />} />
          <Route path="/lost-result" element={<LostResult />} />
          <Route path="/qimen" element={<QimenPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
