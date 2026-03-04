import { Button, Card, CharacterIcon, ProgressBar } from '@/components/common';
import { useQuestion } from '@/hooks/queries';
import { useStore } from '@/store';
import * as Motion from 'motion/react';
import { AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OPTION_BUTTON_CLASS = `
text-text-body hover:bg-primary justify-start rounded-2xl! 
text-base! font-medium! hover:text-white h-14!`;

const MotionButton = Motion.motion(Button);
const MotionCharacterIcon = Motion.motion(CharacterIcon);

const PAGE_TRANSITION = {
  duration: 0.4,
};

const FADE_UP = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

const SLIDE_PAGE = {
  initial: { x: 50, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: -50, opacity: 0 },
  transition: PAGE_TRANSITION,
};

export default function QuestionPage() {
  const [current, setCurrent] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const navigate = useNavigate();
  const { data, isLoading } = useQuestion();
  const selectAnswer = useStore((state) => state.selectAnswer);
  const currentLevel = data?.[current];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleSave = (option) => {
    // 이미 클릭 처리 중이면 중복 실행 방지
    if (isLocked) return;

    setIsLocked(true);

    // 선택한 타입을 Zustand store에 저장
    selectAnswer(option.type);

    // 다음 질문이 남아있으면 index 증가
    if (current < data.length - 1) {
      setCurrent((prev) => {
        // 다음 질문으로 넘어가면서 잠금 해제
        setIsLocked(false);
        return prev + 1;
      });
    } else {
      // 마지막 질문이면 결과 페이지로 이동
      navigate('/result');
    }
  };
  console.log(currentLevel.options);

  return (
    <AnimatePresence mode="wait">
      <Motion.motion.div key={current} {...SLIDE_PAGE}>
        <Card className="mt-10">
          <ProgressBar value={current + 1} />

          <MotionCharacterIcon
            type="Icon"
            className="[&_img]:h-32 [&_img]:w-32"
            initial={{ rotate: -10, scale: 0.8 }}
            animate={{ rotate: [-10, 10, -10, 6, -6], scale: 1 }}
            transition={{
              rotate: {
                duration: 4,
                ease: 'easeInOut',
                repeat: Infinity,
              },
              scale: {
                duration: 0.5,
                type: 'spring',
              },
            }}
          />
          <Motion.motion.div
            className="flex w-full flex-col items-center justify-center gap-2"
            {...FADE_UP}
          >
            <h2 className="text-text-heading text-xl">Q{currentLevel.id}</h2>
            <p className="text-text-body leading-relaxed">
              {currentLevel.text}
            </p>
          </Motion.motion.div>

          <div className="my-8 space-y-4">
            {currentLevel.options?.map((option) => (
              <MotionButton
                key={`${currentLevel.id}-${option.type}`}
                onClick={() => handleSave(option)}
                variant="option"
                className={`${OPTION_BUTTON_CLASS}`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{
                  delay: 0.2,
                  ...PAGE_TRANSITION,
                  ease: 'easeOut',
                }}
              >
                {option.text}
              </MotionButton>
            ))}
          </div>
        </Card>
      </Motion.motion.div>
    </AnimatePresence>
  );
}
