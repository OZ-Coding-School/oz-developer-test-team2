import { Button, Card, CharacterIcon, ProgressBar } from '@/components/common';
import { useQuestion } from '@/hooks/queries';
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
  const navigate = useNavigate();
  const { data, isLoading } = useQuestion();
  const currentLevel = data?.[current];
  if (isLoading) {
    return <div>Loading...</div>;
  }

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
                key={option.text}
                onClick={() => {
                  if (current < data.length - 1) {
                    setCurrent((prev) => prev + 1);
                  } else {
                    navigate('/result/:type');
                  }
                }}
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
