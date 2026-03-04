// 각 문제에 대한 답변을 전역 상태로 관리하세요.
import { create } from 'zustand';

export const useStore = create((set, get) => ({
  answers: [], // 사용자가 선택한 답변들을 저장하는 배열

  selectAnswer: (answer) => {
    set((state) => ({ answers: [...state.answers, answer] }));
  },

  // 누적된 답변을 기반으로 최종 타입 계산
  getResultType: () => {
    const answers = get().answers;

    if (answers.length === 0) return null;

    const countMap = answers.reduce((acc, cur) => {
      acc[cur] = (acc[cur] || 0) + 1;
      return acc;
    }, {});

    const sorted = Object.entries(countMap).sort((a, b) => b[1] - a[1]);

    return sorted[0][0];
  },

  // 테스트 재시작용 초기화
  resetAnswers: () => {
    set({ answers: [] });
  },
}));
