function Card({ children, className = '' }) {
  return (
    <div
      className={`flex w-full max-w-[448px] flex-col items-center justify-center rounded-3xl bg-[#FFFBFB] p-8 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] ${className}`}
    >
      {children}
      <span className="text-text-muted mt-6 text-xs">made with ❤ Ozcoding️</span>
    </div>
  );
}

export default Card;
