import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getResultsByType } from '@/api/services';
import RestartIcon from '@/assets/icons/RestartIcon.svg?react';

import { Card, Button, CharacterIcon } from '@/components/common';

export default function ResultPage() {
  const { type } = useParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

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
    <div className="grid min-h-screen place-items-center bg-transparent p-6">
      <div className="w-[360px] rounded-2xl bg-white p-6 shadow-xl">
        <p className="text-center text-xs text-gray-500">당신의 개발자 유형</p>

        <h1 className="mt-1 text-center font-bold text-pink-500">{name}</h1>

        <div className="mt-4 flex justify-center">
          <CharacterIcon type={type} size={88} />
        </div>

        {emoji ? <p className="mt-2 text-center text-xl">{emoji}</p> : null}

        <h2 className="mt-3 text-center font-semibold">{title}</h2>
        <p className="mt-2 text-center text-sm text-gray-600">{description}</p>

        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {hashtags?.map((h) => (
            <span
              key={h}
              className="rounded-full bg-pink-50 px-3 py-1 text-xs text-pink-600"
            >
              {h}
            </span>
          ))}
        </div>

        <div className="mt-5 rounded-xl bg-pink-50 p-4">
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
        <Button
          className="mt-6 w-full"
          onClick={() => window.location.replace('/')}
        >
          <RestartIcon className="h-5 w-5 text-white" />
          다시하기
        </Button>
      </div>
    </div>
  );
}
