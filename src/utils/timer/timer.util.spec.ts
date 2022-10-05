/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/dot-notation */

import TimerUtil from './timer.util';

describe('utils > timer', () => {
  describe('TimerUtil', () => {

    let timerUtil: TimerUtil;

    beforeAll(() => {
      timerUtil = new TimerUtil();
    });

    afterAll(() => {
      (<any>timerUtil) = undefined;
    });

    describe('runTimer()', () => {

      beforeEach(() => {
        jest.useFakeTimers(); // Mocks all timers
      });

      afterEach(() => {
        jest.runOnlyPendingTimers(); // Runs any pending timers to completion.
        jest.useRealTimers(); // Restores the timers.
      });

      it('should invoke the callback after 1 sec', () => {

        const callbackStub = jest.spyOn(<any>timerUtil, 'callback').mockImplementation();

        timerUtil.runTimer();
        expect(callbackStub).not.toHaveBeenCalled();

        jest.advanceTimersByTime(1000); // Simulates passage of 1 sec.
        // jest.runAllTimers(); // Runs all timers to completion. Can be used instead of above statement.

        expect(callbackStub).toHaveBeenCalled();

        callbackStub.mockRestore();

      });

    });

    describe('[private] callback()', () => {

      it('should do something', () => {

        const logStub = jest.spyOn(console, 'log').mockReturnValue();

        timerUtil['callback'](); // Using array syntax preserves type information 
                                 // without complaining about property access violation.

        expect(logStub).toHaveBeenCalledWith('callback invoked');
       
        logStub.mockRestore();

      });

    });

    describe('getCurrentDate()', () => {

      beforeEach(() => {
        jest.useFakeTimers('modern');
        jest.setSystemTime(new Date('2021-02-20')); // Sets the date to 20th Feb 2021.
      });

      afterEach(() => {
        jest.useRealTimers(); // Restores the timers.
      });      

      it('Should return current date as Feb 20th, 2021', () => {

        const currentDate: Date = timerUtil.getCurrentDate();

        expect(currentDate).toEqual(new Date('2021-02-20'));

      });

    });

  });
});