import { useNavigate } from 'react-router-dom';
import Card from '@/components/common/card';
import Button from '@/components/common/button';

export default function ResultPage() {
  const navigate = useNavigate();

  return (
    <Card className="mt-10">
      <div className="text-heading text-2xl font-semibold">결과</div>
      <div className="mt-6">
        <Button variant="secondary" size="md" onClick={() => navigate('/')}>
          홈으로
        </Button>
      </div>
    </Card>
  );
}
