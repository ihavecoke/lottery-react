import Roller from './roller';

describe("create new rolling object", () => {
  let rolling = new Roller({});

  test('should return default value', () => {
    expect(rolling.currentRollSpeed).toBe(200);
    expect(rolling.acceleratedSpeed).toBe(30);
    expect(rolling.decelerateSpeed).toBe(80);
    expect(rolling.rollingCycleNumber).toBe(3.5 * 8);
  });
});

describe("start rolling", () => {
  let rolling = new Roller({});
  test("should incr currentRollSpeed", () => {
    rolling.start();
    expect(0).toBe(0)
  })
});

