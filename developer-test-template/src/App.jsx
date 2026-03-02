import RootLayout from '@/layouts/RootLayout';
import HomePage from '@/pages/HomePage';
import QuestionPage from '@/pages/QuestionPage';
import ResultPage from '@/pages/ResultPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/result/:type" element={<ResultPage />} />
            <Route path="/question" element={<QuestionPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
