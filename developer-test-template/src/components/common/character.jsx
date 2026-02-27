import { IMAGE_ASSETS } from '../../constants/images';

function CharacterIcon({ type, className = '' }) {
  // type 값과 파일명이 일치하는 이미지를 동적으로 선택
  const imgSrc = IMAGE_ASSETS[type];

  return (
    <div
      className={`flex w-full flex-col items-center text-center ${className}`}
    >
      {imgSrc ? (
        <div className="flex aspect-auto h-40 w-40 items-center justify-center">
          <img
            src={imgSrc}
            alt={type}
            className="max-h-full max-w-full object-contain"
          />
        </div>
      ) : (
        <div>No Image</div>
      )}
    </div>
  );
}

export default CharacterIcon;
