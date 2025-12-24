export function useCopyLink() {
  const copy = async (text) => {
    if (!text) return;

    await navigator.clipboard.writeText(text);
  };

  return { copy };
}
