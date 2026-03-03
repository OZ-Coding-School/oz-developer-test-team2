import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
//api 호출
export async function getQuestions() {
  const { data } = await axios.get('http://localhost:3000/api/questions');
  return data;
}

export const useQuestion = () => {
  return useQuery({
    queryKey: ['questions'],
    queryFn: getQuestions,
    staleTime: 5000,
  });
};
