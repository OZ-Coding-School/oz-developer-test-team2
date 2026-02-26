import hamster from '@/assets/icon.webp';
import Card from '@/components/common/card';

export default function HomePage() {
  return (
    <>
      {/* 예시, 컴포넌트 제작 완료 후 편집 예정 */}
      <Card>
        <img className="h-32 w-32" src={hamster} alt="hamster" />
        <h3 className="mt-6 text-center text-2xl">나는 어떤 개발자일까?</h3>
        <p className="text-text-description mt-4">햄스터 개발자 유형 테스트</p>
      </Card>
    </>
  );
}
