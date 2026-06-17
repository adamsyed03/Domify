export function initPostHog() {
  const apiKey = import.meta.env.VITE_POSTHOG_KEY;
  const apiHost = import.meta.env.VITE_POSTHOG_HOST || 'https://eu.i.posthog.com';

  if (!apiKey) {
    return;
  }

  void import('posthog-js').then(({ default: posthog }) => {
    posthog.init(apiKey, {
      api_host: apiHost,
      capture_pageview: true,
      capture_pageleave: true,
      autocapture: true,
    });
  });
}
