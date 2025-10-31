import { detect } from 'detect-browser';

function niceName(name?: string): string {
  if (!name) return 'Unknown';
  switch (name.toLowerCase()) {
    case 'edge':
    case 'edge-chromium': return 'Edge';
    case 'chrome':        return 'Chrome';
    case 'crios':         return 'Chrome';
    case 'firefox':       return 'Firefox';
    case 'fxios':         return 'Firefox';
    case 'opera':         return 'Opera';
    case 'safari':        return 'Safari';
    case 'ios':           return 'Safari';
    case 'samsung':       return 'Samsung Internet';
    case 'yandexbrowser': return 'Yandex';
    case 'vivaldi':       return 'Vivaldi';
    case 'ie':            return 'IE';
    case 'chromium':      return 'Chromium';
    default:
      return name.charAt(0).toUpperCase() + name.slice(1);
  }
}

export function detectBrowserName(): string {
  if (typeof navigator === 'undefined') return 'Unknown';

  const uaData: any = (navigator as any).userAgentData;
  const list = uaData?.brands || uaData?.uaList;

  if (Array.isArray(list)) {
    const brands = list
      .map((b: any) => String(b.brand ?? '').toLowerCase())
      .filter((b: string) => b && b.replace(/[^a-z]/g, '') !== 'notabrand');

    if (brands.some(b => b.includes('edge')))     return 'Edge';
    if (brands.some(b => b.includes('opera')))    return 'Opera';
    if (brands.some(b => b.includes('brave')))    return 'Brave';
    if (brands.some(b => b.includes('vivaldi')))  return 'Vivaldi';
    if (brands.some(b => b.includes('yandex')))   return 'Yandex';
    if (brands.some(b => b.includes('samsung')))  return 'Samsung Internet';
    if (brands.some(b => b.includes('chrome') || b.includes('chromium'))) return 'Chrome';
  }

  const result = detect();

  return niceName(result?.name);
}


