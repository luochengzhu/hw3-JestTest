/* eslint-disable @typescript-eslint/dot-notation */

import Store from './store';

describe('utils > store', () => {
  describe('Store', () => {

    beforeEach(() => {
      Store['_data'] = undefined;
    });

    describe('setData()', () => {

      it('should assign the input data to Store._data', () => {

        const mockData = { key: 'value' };

        Store.setData(mockData);

        expect(Store['_data']).toEqual(mockData);

      });

    });

    describe('getData()', () => {

      it('should return an object equal to Store._data', () => {

        const mockData = { key: 'value' };
        Store['_data'] = mockData;

        const returnedValue = Store.getData();

        expect(returnedValue).toEqual(mockData);

      });

      it('should return an object with a reference different to Store._data', () => {

        const mockData = { key: 'value' };
        Store['_data'] = mockData;

        const returnedValue = Store.getData();

        expect(returnedValue).toEqual(mockData);
        expect(returnedValue).not.toBe(mockData);
        expect(Store['_data']).toBe(mockData);

      });

      it('should return an object strictly equal to object stored in Store._data', () => {

        const mockData = { key: 'value' };
        const mockDataWithUndefined = { key: 'value', key2: undefined };
        Store['_data'] = mockData;

        const returnedValue = Store.getData();

        expect(returnedValue).toStrictEqual(mockData);
        expect(returnedValue).toEqual(mockDataWithUndefined);
        expect(returnedValue).not.toStrictEqual(mockDataWithUndefined);

      });

    });

  });
});
