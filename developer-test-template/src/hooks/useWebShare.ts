export function useWebShare(showToast?: (msg: string) => void) {
  const share = async (payload: ShareData, fallbackText?: string) => {
    try {
      if (navigator.share) {
        await navigator.share(payload);
        return;
      }

      const textToCopy =
        fallbackText ??
        [payload.text, payload.url].filter(Boolean).join('\n');

      await navigator.clipboard.writeText(textToCopy);
      showToast?.('공유 문구가 복사됐어요!');
    } catch (e) {
      showToast?.('공유에 실패했어요.');
    }
  };

  return { share };
}