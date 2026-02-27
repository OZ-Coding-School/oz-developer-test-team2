import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RootLayout from '@/layouts/RootLayout';
import HomePage from '@/pages/HomePage';
import TestPage from '@/pages/TestPage';
import ResultPage from '@/pages/ResultPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/result/:type" element={<ResultPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
