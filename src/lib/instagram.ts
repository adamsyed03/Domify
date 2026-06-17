export const instagramOrderUrl = 'https://ig.me/m/domify_rs';

export function openInstagramOrder() {
  const appUrl = 'instagram://user?username=domify_rs';

  window.location.href = appUrl;

  window.setTimeout(() => {
    window.location.href = instagramOrderUrl;
  }, 900);
}
