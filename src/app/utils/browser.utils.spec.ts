import { detectBrowserName } from './browser.utils';

describe('detectBrowserName', () => {
  const originalUA = navigator.userAgent;
  const originalUAData: any = (navigator as any).userAgentData;

  const setUA = (ua: string) => {
    Object.defineProperty(window.navigator, 'userAgent', {
      value: ua,
      configurable: true,
    });
  };

  const setUAData = (uaData: any) => {
    Object.defineProperty(window.navigator, 'userAgentData', {
      value: uaData,
      configurable: true,
    });
  };

  beforeAll(() => {
    jasmine.getEnv().allowRespy(true);
  });

  afterEach(() => {
    setUA(originalUA);
    setUAData(originalUAData);
  });

  it('should detect Brave, by UA-CH list', () => {
    setUAData({ brands: [
      { brand: 'Brave', version: '141' },
      { brand: 'Not?A_Brand', version: '8' },
      { brand: 'Chromium', version: '141' },
    ]});
    setUA('');

    expect(detectBrowserName()).toBe('Brave');
  });

  it('should detect Firrefox by niceName funciton', () => {
    setUAData(undefined);
    setUA('Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) FxiOS/118.0 Mobile/15E148 Safari/605.1.15');
   
    expect(detectBrowserName()).toBe('Firefox');
  });

  it('should return unknown', () => {
    setUAData(undefined);
    setUA('CustomAgent/1.0');
    
    expect(detectBrowserName()).toBe('Unknown');
  });
});


