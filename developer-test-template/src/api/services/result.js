import instance from '../instance';

export const getResultsByType = async (type) => {
  const { data } = await instance.get(`/api/results/${type}`);
  return data;
};
