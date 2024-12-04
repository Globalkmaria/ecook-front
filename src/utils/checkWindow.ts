export const assertBrowser = (functionName: string) => {
  if (typeof window === 'undefined') {
    throw new Error(`${functionName} must be used in the browser.`);
  }
};
