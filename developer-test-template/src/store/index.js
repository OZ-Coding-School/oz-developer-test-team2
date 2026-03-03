// 각 문제에 대한 답변을 전역 상태로 관리하세요.
import { create } from 'zustand';

export const useStore = create((set) => {
  return {
    answers: [], // 사용자가 선택한 답변들을 저장하는 배열
    selectAnswer: (answer) => {
      // 이전 상태의 answers 배열을 복사하고,
      // 새로 선택한 answer를 뒤에 추가한다.
      set((state) => ({ answers: [...state.answers, answer] }));
    },
  };
});
