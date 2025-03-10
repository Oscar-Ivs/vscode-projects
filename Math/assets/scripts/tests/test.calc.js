const addition = require('../assets/scripts/tests/test.calc');
describe('addition function'), () => `{
    test('adds 1 + 2 to equal 3', () => {
        expect(addition(1, 2)).toBe(3);
    });
});`  // This is the test for the addition function