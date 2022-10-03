/* eslint-disable @typescript-eslint/no-explicit-any */
import Calculator from './calculator';

describe('services > math', () => {
  describe('Calculator', () => {

    describe('add()', () => {

      let calculator: Calculator;
      let logStub: jest.MockedFunction<any>;

      beforeAll(() => {
        calculator = new Calculator();
      });

      beforeEach(() => {
        logStub = jest.spyOn(console, 'log').mockReturnValue();
      });

      afterEach(() => {
        logStub.mockRestore();
      });

      afterAll(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (<any>calculator) = undefined;
      });

      it('should return 2 when inputs are 1 and 1', () => {

        const result: number = calculator.add(1, 1);

        expect(result).toEqual(2);

      });

      it('should return -2 when inputs are -1 and -1', () => {

        const result: number = calculator.add(-1, -1);

        expect(result).toEqual(-2);

      });

      it('should invoke console.log() with the result', () => {

        calculator.add(1, 1);

        expect(logStub).toHaveBeenCalledWith('The result is: ', 2);

      });

    });

  });
});