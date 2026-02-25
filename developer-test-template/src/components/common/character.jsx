// // API 연동 전 UI 테스트를 위한 임시 목업 데이터
// const dummyBackend = {
//   type: 'backend',
//   name: '백엔드 코끼리',
//   title: '논리적이고 체계적인 설계자 코끼리',
//   description:
//     '보이지 않는 곳에서 시스템을 탄탄하게 만드는 당신! 데이터베이스 설계와 API 구축에 강한 백엔드 전문가입니다.',
// };

// assets 폴더 내의 모든 webp 이미지를 동적으로 import하여 이미지 렌더링에 활용
const images = import.meta.glob('../../assets/*.webp', {
  eager: true,
  import: 'default',
});

function CharacterIcon({ type, className = '' }) {
  // type 값과 파일명이 일치하는 이미지를 동적으로 선택
  const imgSrc = images[`../../assets/${type}.webp`];

  return (
    <div
      className={`flex w-full flex-col items-center text-center ${className}`}
    >
      {imgSrc ? (
        <div className="flex aspect-auto h-54 w-60 items-center justify-center">
          <img
            src={imgSrc}
            alt={type}
            className="max-wfull max-h-full object-contain"
          />
        </div>
      ) : (
        <div>No Image</div>
      )}
    </div>
  );
}

export default CharacterIcon;
