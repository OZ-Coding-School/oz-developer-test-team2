import SparkleIcon from '@/assets/icons/SparkleIcon.svg?react';
import { Button, Card, CharacterIcon } from '@/components/common';
import * as Motion from 'motion/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const MotionButton = Motion.motion(Button);
const MotionCharacterIcon = Motion.motion(CharacterIcon);

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <>
      <Card className="relative bg-white [&>span]:mt-6">
        <Motion.motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 flex flex-col items-center justify-center"
        >
          <MotionCharacterIcon
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 1.8,
              ease: 'easeInOut',
            }}
            type={'Icon'}
            className="relative z-20 [&_img]:h-32 [&_img]:w-32"
          />
          <h3 className="text-center text-3xl">나는 어떤 개발자일까?</h3>
          <p className="text-text-description mt-4">
            햄스터 개발자 유형 테스트
          </p>
        </Motion.motion.div>

        <Motion.motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-bg-default text-text-body mb-8 w-full rounded-2xl p-4 text-center text-sm"
        >
          <p>✨ 5개의 질문으로 알아보는 </p>
          <p>나의 개발자 성향</p>
        </Motion.motion.div>
        <MotionButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.4,
            type: 'spring',
            stiffness: 120,
            damping: 14,
          }}
          className="h-14! text-base!"
          onClick={() => navigate('/question')}
        >
          <SparkleIcon className="h-5 w-5 text-white" />
          시작하기
        </MotionButton>
      </Card>
    </>
  );
}
