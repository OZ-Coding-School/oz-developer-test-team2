import { Button, Card, CharacterIcon, ProgressBar } from '@/components/common';
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

const data = {
  id: 1,
  text: '새로운 프로젝트를 시작할 때 가장 먼저 하는 일은?',
  options: [
    {
      text: '사용자가 볼 화면부터 디자인한다',
      type: 'frontend',
    },
  ],
};

export default function QuestionPage() {
  const [current, setCurrent] = useState(1);
  const navigate = useNavigate();

  return (
    <AnimatePresence mode="wait">
      <Motion.motion.div key={current} {...SLIDE_PAGE}>
        <Card className="mt-10">
          <ProgressBar value={current} max={5} />

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
            <h2 className="text-text-heading text-xl">Q{current}</h2>
            <p className="text-text-body leading-relaxed">{data.text}</p>
          </Motion.motion.div>

          <div className="mt-6 flex w-full flex-col gap-3">
            {data.options.map((option, index) => (
              <div key={index} className="mb-8 space-y-4">
                <MotionButton
                  onClick={() => {
                    if (current < 5) {
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
              </div>
            ))}
          </div>
        </Card>
      </Motion.motion.div>
    </AnimatePresence>
  );
}
