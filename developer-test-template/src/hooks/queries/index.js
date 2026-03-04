import { getQuestionsByType } from '@/api/services/questions';
import { useQuery } from '@tanstack/react-query';

export const useQuestion = () => {
  return useQuery({
    queryKey: ['questions'],
    queryFn: getQuestionsByType,
    staleTime: 5000,
  });
};
