import Badge from '@/components/common/badge';
import Card from '@/components/common/card';
import ProgressBar from '../components/common/progressbar';
import Button from '../components/common/button';

export default function HomePage() {
  return (
    <div>
      {/* 예시, 컴포넌트 제작 완료 후 편집 예정 */}
      <Card>
        <div className="text-2xl">
          나는 어떤 개발자일까??
          <Badge label="React" />
        </div>
        <ProgressBar />
        <Button variant="primary" size="sm" className="m-4">
          시작하기
        </Button>
      </Card>
    </div>
  );
}
