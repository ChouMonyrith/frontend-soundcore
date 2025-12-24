export function useNativeShare() {
  const share = async ({ title, text, url }) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    }
  };

  return { share };
}
