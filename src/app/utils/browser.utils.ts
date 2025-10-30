export function detectBrowserName(): string {
    // check that solution, maybe library is better
    const navAny = navigator as any;
    // if (navAny?.brave) return 'Brave';
    // console.log(navAny);
    // console.log(navAny?.brave);

  const ua = navigator.userAgent;
  console.log(ua);
  if (/Edg\//.test(ua)) return 'Edge';
  if (/Chrome\//.test(ua)) return 'Chrome';
  if (/Firefox\//.test(ua)) return 'Firefox';
  if (/Safari\//.test(ua) && !/Chrome\//.test(ua)) return 'Safari';
  if (/OPR\//.test(ua)) return 'Opera';
  return 'Unknown';
}


