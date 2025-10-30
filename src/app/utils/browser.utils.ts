export function detectBrowserName(): string {
    // check that solution, maybe library is better

  const ua = navigator.userAgent;
  
  if (/Edg\//.test(ua)) return 'Edge';
  if (/Chrome\//.test(ua)) return 'Chrome';
  if (/Firefox\//.test(ua)) return 'Firefox';
  if (/Safari\//.test(ua) && !/Chrome\//.test(ua)) return 'Safari';
  if (/OPR\//.test(ua)) return 'Opera';
  return 'Unknown';
}


