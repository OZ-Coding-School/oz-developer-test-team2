import RootLayout from '@/layouts/RootLayout';
import HomePage from '@/pages/HomePage';
import QuestionPage from '@/pages/QuestionPage';
import ResultPage from '@/pages/ResultPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/result/:type" element={<ResultPage />} />
          <Route path="/question" element={<QuestionPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
