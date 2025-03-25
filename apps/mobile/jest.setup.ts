import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.resetMocks();
});
global.setImmediate = global.setImmediate || ((fn: () => void) => setTimeout(fn, 0));
