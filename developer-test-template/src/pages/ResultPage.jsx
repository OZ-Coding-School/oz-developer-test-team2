import { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getResultsByType } from '@/api/services';
import RestartIcon from '@/assets/icons/RestartIcon.svg?react';
import ShareIcon from '@/assets/icons/ShareIcon.svg?react';

import { Card, Button, CharacterIcon, Toast } from '@/components/common';
import { useToast, useWebShare } from '@/hooks';
import { motion } from 'motion/react';

export default function ResultPage() {
  const { type } = useParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { message, show } = useToast();
  const { share } = useWebShare(show);

  const MotionCharacterIcon = motion(CharacterIcon);

  const shareUrl = useMemo(() => {
    if (typeof window === 'undefined') return '';
    return new URL(`/result/${type}`, window.location.href).toString();
  }, [type]);

  const handleShare = async () => {
    if (!result) return;

    const typeName = result.name ?? type;
    const typeDesc = result.description ?? '';
    const text = `나는 "${typeName}"! 🐹 ${typeDesc} 나는 어떤 개발자일까? 테스트 해보기`;

    await share({ title: text, text, url: shareUrl }, `${text}\n${shareUrl}`);
  };
  // 추후 모달창으로 변경 예정

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setLoading(true);
        const data = await getResultsByType(type);

        if (alive) setResult(data);
      } catch (e) {
        console.error(e);
        if (alive) setResult(null);
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [type]);

  if (loading) {
    return <div>로딩 중...</div>;
  }
  if (!result) {
    return <div>결과를 불러오지 못했습니다.</div>;
  }

  const { emoji, name, title, description, characteristics, hashtags } = result;

  return (
    <motion.div
      className="min-h-screen bg-transparent p-3"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      <Card>
        <div className="grid min-h-screen place-items-center bg-transparent p-3">
          <p className="text-center text-xs text-gray-500">
            당신의 개발자 유형
          </p>

          <h1 className="text-center font-bold text-pink-500">{name}</h1>

          <div className="flex justify-center">
            <MotionCharacterIcon
              type={type}
              size={88}
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
          </div>

          {emoji ? <p className="text-center text-xl">{emoji}</p> : null}

          <h2 className="text-center font-semibold">{title}</h2>
          <p className="text-center text-sm text-gray-600">{description}</p>

          <div className="flex w-full flex-wrap justify-center gap-2">
            {hashtags?.map((h) => (
              <span
                key={h}
                className="rounded-full bg-pink-50 px-3 py-1 text-xs text-pink-600"
              >
                {h}
              </span>
            ))}
          </div>

          <div className="w-full rounded-xl bg-pink-50 p-4">
            <p className="mb-3 text-center text-sm font-semibold">나의 특징</p>
            <ul className="space-y-2 text-sm text-gray-700">
              {characteristics?.map((c, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-pink-400" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
          <Button className="w-full" onClick={() => handleShare?.()}>
            <ShareIcon className="h-5 w-5 text-white" />
            결과 공유하기
          </Button>
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => navigate('/')}
          >
            <RestartIcon className="text-primary h-5 w-5" />
            다시 테스트하기
          </Button>
          <Toast message={message} />
        </div>
      </Card>
    </motion.div>
  );
}
