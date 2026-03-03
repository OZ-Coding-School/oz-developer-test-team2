import instance from '../instance';

export const getQuestionsByType = async () => {
  const { data } = await instance.get('/api/questions');
  return data;
};
