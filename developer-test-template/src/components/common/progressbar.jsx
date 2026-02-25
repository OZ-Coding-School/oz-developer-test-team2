function ProgressBar({ value = 1, max = 5, className = '' }) {
  // 현재 단계(value)를 전체 단계(max)로 나눈 뒤 100을 곱해 퍼센트로 변환
  // max가 0이면 0으로 처리해서 Infinity 방지
  const rawPercentage = max === 0 ? 0 : (value / max) * 100;
  const percentage = Math.min(Math.max(rawPercentage, 0), 100);

  return (
    <>
      <div className="mb-1 flex w-full items-center justify-between text-sm">
        <span className="text-text-muted">진행률</span>
        <span className="text-primary">
          {value} / {max}
        </span>
      </div>

      <div
        className={`bg-progress-track h-2 w-full overflow-hidden rounded-full ${className}`}
      >
        <div
          className="bg-primary h-full rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </>
  );
}

export default ProgressBar;
