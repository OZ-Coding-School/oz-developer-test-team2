import { IMAGE_ASSETS } from '@/constants/images';
import * as Motion from 'framer-motion';
import { useEffect, useState } from 'react';

// 랜덤 낙하 아이템들의 위치/움직임/크기/지속시간을 미리 생성
// 컴포넌트 밖에 선언하여 리렌더링 시 값이 다시 생성되지 않도록 함
const RANDOM_ITEMS = Array.from({ length: 18 }, () => ({
  left: Math.random() * 100,
  drift: (Math.random() - 0.5) * 200,
  scale: 0.8 + Math.random() * 0.4,
  duration: 10 + Math.random() * 8,
}));

function RainAnimation() {
  // rainPhase:
  // 'fall' → 낙하 유지
  // 'fade' → 서서히 사라짐
  // 'done' → 완전히 제거 (null 반환)
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const fallingTypes = [
    'ai',
    'backend',
    'data',
    'devops',
    'frontend',
    'fullstack',
    'gamedev',
    'mobile',
  ];

  return (
    <Motion.motion.div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
      {[...Array(isMobile ? 12 : 18)].map((_, i) => {
        const type = fallingTypes[i % fallingTypes.length];

        // 개별 아이콘 낙하 애니메이션
        // y: 위에서 아래로 이동
        // x: 좌우 드리프트
        // rotate: 회전
        // opacity: 서서히 등장 후 사라짐
        return (
          <Motion.motion.img
            key={i}
            src={IMAGE_ASSETS[type]}
            initial={{ y: '-15vh', opacity: 0 }}
            animate={{
              y: isMobile ? '60vh' : '80vh',
              x: [0, RANDOM_ITEMS[i].drift * 0.5, RANDOM_ITEMS[i].drift],
              rotate: [0, 60, 120],
              opacity: [0, 0.45, 0.4, 0],
            }}
            transition={{
              duration: RANDOM_ITEMS[i].duration,
              ease: 'linear',
              delay: i * 0.7, //시간 차 두고 이미지 내려옴
            }}
            className="pointer-events-none absolute w-16 opacity-20"
            style={{
              left: `${RANDOM_ITEMS[i].left}%`,
              scale: RANDOM_ITEMS[i].scale,
            }}
          />
        );
      })}
    </Motion.motion.div>
  );
}

export default RainAnimation;
