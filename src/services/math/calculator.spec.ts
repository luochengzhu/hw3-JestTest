import Calculator from './calculator';

describe('services > math', () => {     // a suite is created using keyword describe()
  describe('Calculator', () => {        // a suite = setup + teardown + test
    describe('add()', () => {           // a test is created using keyword it() or test()
      let calculator: Calculator;
      let logStub: jest.MockedFunction<any>;

      beforeAll(() => {                 // setup
        calculator = new Calculator();
      });

      beforeEach(() => {
        logStub = jest.spyOn(console, 'log').mockReturnValue();
      });

      afterEach(() => {
        logStub.mockRestore();
      });

      afterAll(() => {                  // teardown
        (<any>calculator) = undefined;
      });

      it('should return 2 when inputs are 1 and 1', () => {     // a test = assemble + act + assert, AAA pattern
        // const calculator: Calculator = new Calculator();     // Assemble

        const result: number = calculator.add(1, 1);            // Act

        expect(result).toEqual(2);                              // Assert
      });

      it('should return -2 when inputs are -1 and -1', () => {
        const result: number = calculator.add(-1, -1);

        expect(result).toEqual(-2);
      });

      it('should invoke console.log() with the result 2 for inputs 1 and 1', () => {
        const logSpy = jest.spyOn(window.console, 'log');       // Spy syntax: const spy = jest.spyOn(object, 'methodName')
        logSpy.mockImplementation(() => {});                    // Mock syntax: spy.mockImplementation(() => {new function body});
        // This will no longer print to console.
        const result: number = calculator.add(1, 1);

        expect(logSpy).toHaveBeenCalledWith('The result is: ', result);

        logSpy.mockRestore();
      });


    });
  });
});


// optionally, may be a clean-up/teardown step after assert
// Assemble:    create instances of classes/variables
//              set up test data for inputs
//              set up spies/stubs/mocks
//              set up expected output
// Act:         execute the function unter test
// Assert:      validate the behavior of code by comparing
//              expect(spy/stub/mock).toHaveBeenCalled()
//              expect(spy/stub/mock).toHaveBeenCalledWith([arguments])
//              expect(actual).toBeDefined()
//              await expect(error causing code returning a promise).rejects.toThrowError()
// Setup:       beforeAll(), beforeEach()
// Teardown:    afterEach(), afterAll()
// Use beforeEach()/afterEach() if the function/class stores state,
// and we need a clean instance for each test.
// Spy:         The function that being spied on actually EXECUTES.
// Mock:        The function that being mocked DOES NOT EXECUTE.
// Stub:        syntax: spy.mockReturnValue(someValue)