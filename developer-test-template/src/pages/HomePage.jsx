import hamster from '@/assets/icon.webp';
import Card from '@/components/common/card';
import { useNavigate } from 'react-router-dom';
import SparkleIcon from '../assets/icons/SparkleIcon.svg?react';
import Button from '../components/common/button';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <Card className="gap-8">
      <div className="flex flex-col items-center justify-center">
        <img className="h-32 w-32" src={hamster} alt="hamster" />
        <h3 className="mt-6 text-center text-2xl">나는 어떤 개발자일까?</h3>
        <p className="text-text-description mt-4">햄스터 개발자 유형 테스트</p>
      </div>
      <div className="bg-bg-default text-text-body w-full rounded-2xl p-4 text-center text-sm">
        <p>✨ 5개의 질문으로 알아보는 </p>
        <p>나의 개발자 성향</p>
      </div>
      <Button onClick={() => navigate('/test')}>
        <SparkleIcon className="h-5 w-5 text-white" />
        시작하기
      </Button>
    </Card>
  );
}
