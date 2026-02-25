import Badge from '@/components/common/badge';
import Card from '@/components/common/card';
import ProgressBar from '../components/common/progressbar';
import Button from '../components/common/button';

// icon example
import SparkleIcon from '@/assets/icons/SparkleIcon.svg?react';

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
        <Button
          variant="primary"
          size="sm"
          className="m-4"
          leftIcon={<SparkleIcon className="h-4 w-4 text-white" />}
        >
          시작하기
        </Button>
      </Card>
    </div>
  );
}
