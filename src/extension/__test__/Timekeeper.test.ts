import { Timekeeper } from '../lib/Timekeeper';

let timekeeper: Timekeeper;

test('Initialize Timekeeper', () => {
  expect(() => {
    timekeeper = new Timekeeper;
  }).not.toThrowError();
});

describe('Test timekeeper behavior', () => {
  beforeEach(() => {
    timekeeper = new Timekeeper;
  });

  test('Receive status', () => {
    expect(timekeeper.status).toBe('finished');
  });
  
  test('Start timer', () => {
    timekeeper.start();
    expect(timekeeper.status).toBe('in_progress');
  });
  
  test('Finish timer', () => {
    timekeeper.finish();
    expect(timekeeper.status).toBe('finished');
    expect(timekeeper.currentTimeSeconds).toBe(0);
  });
  
  test('Pause and resume timer', () => {
    timekeeper.start();
    timekeeper.pause();
    expect(timekeeper.status).toBe('paused');
    timekeeper.resume();
    expect(timekeeper.status).toBe('in_progress');
  });
  
  test('Laugh test for current time', async () => {
    timekeeper.start();
    await new Promise((resolve) => setTimeout(resolve, 3000));
    expect(timekeeper.currentTimeSeconds).toBeGreaterThanOrEqual(3);
  });
});

describe('Status testing', () => {
  beforeEach(() => {
    timekeeper = new Timekeeper;
  });

  test('Finish is possible when paused', () => {
    timekeeper.start();
    timekeeper.pause();
    expect(timekeeper.status).toBe('paused');
    timekeeper.finish();
    expect(timekeeper.status).toBe('finished');
  })

  test('Initialize with seconds', () => {
    const timekeeper = new Timekeeper(2000);
    expect(timekeeper.currentTimeSeconds).toBe(2000);
  });
  
});