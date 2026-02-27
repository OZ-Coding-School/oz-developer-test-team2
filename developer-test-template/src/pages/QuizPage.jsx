import { Button, Card, CharacterIcon, ProgressBar } from '@/components/common';

const data = {
  id: 1,
  text: '새로운 프로젝트를 시작할 때 가장 먼저 하는 일은?',
  options: [
    {
      text: '사용자가 볼 화면부터 디자인한다',
      type: 'frontend',
    },
  ],
};

const OPTION_BUTTON_CLASS = `
text-text-body hover:bg-primary justify-start rounded-2xl! 
text-base! font-medium! hover:text-white`;

export default function QuizPage() {
  // const navigate = useNavigate();

  return (
    <Card className="mt-10">
      <ProgressBar />
      <CharacterIcon type={'Icon'} className="[&_img]:h-32 [&_img]:w-32" />
      <div className="flex w-full flex-col items-center justify-center gap-2">
        <h2 className="text-text-heading text-xl">Q{data.id}</h2>
        <p className="text-text-body leading-relaxed">{data.text}</p>
      </div>

      <div className="mt-6 flex w-full flex-col gap-3">
        {data.options.map((option, index) => (
          <div className="mb-8 space-y-4">
            <Button
              key={index}
              variant="option"
              className={`${OPTION_BUTTON_CLASS}`}
            >
              {option.text}
            </Button>
            <Button
              key={index}
              variant="option"
              className={`${OPTION_BUTTON_CLASS}`}
            >
              {option.text}
            </Button>
          </div>
        ))}
      </div>

      {/* <div>
        <Button
          variant="secondary"
          size="md"
          onClick={() => navigate('/result/:type')}
        >
          결과로 이동
        </Button>
      </div> */}
    </Card>
  );
}
