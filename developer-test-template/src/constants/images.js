// assets 폴더 내의 모든 webp 이미지를 동적으로 import하여 이미지 렌더링에 활용
export const images = import.meta.glob('/src/assets/*.webp', {
  eager: true,
  import: 'default',
});

// 파일 경로 기반 객체를 파일명 기반 객체로 변환
export const IMAGE_ASSETS = Object.fromEntries(
  Object.entries(images).map(([path, module]) => {
    const fileName = path.split('/').pop()?.replace('.webp', '');
    return [fileName, module];
  })
);
