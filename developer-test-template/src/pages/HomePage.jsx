import Badge from '@/components/common/badge';
import Card from '@/components/common/card';
import ProgressBar from '../components/common/progressbar';

export default function HomePage() {
  return (
    <div>
      <Card>
        <div className="text-2xl">
          나는 어떤 개발자일까??
          <Badge label="React" />
        </div>
        <ProgressBar />
      </Card>
    </div>
  );
}
