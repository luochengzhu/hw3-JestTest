import axios from 'axios';
import Store from '../../utils/store/store';
import HttpService from './http.service';

describe('services > http', () => {
  describe('HttpService', () => {

    let httpService: HttpService;

    beforeAll(() => {
      httpService = new HttpService();
    });

    afterAll(() => {
      (<any>httpService) = undefined;
    });

    describe('getData()', () => {
      it('should invoke axios.get() with "myUrl"', async () => {
        const getStub = jest                                // Stub syntax: spy.mockReturnValue(someValue)
          .spyOn(axios, 'get')
          .mockResolvedValue({ status: 200, data: {} });

        await httpService.getData();

        expect(getStub).toHaveBeenCalledWith('/myUrl');
      });

      it('should return the status as 200', async () => {
        const getStub = jest
          .spyOn(axios, 'get')
          .mockResolvedValue({ status: 200, data: {} });

        const response = await httpService.getData();

        expect(response.status).toEqual(200);

        getStub.mockRestore();
      });
    });

    describe('getDataAndSetStore()', () => {
      it('should invoke axios.get() with "myUrl"', async () => {
        const getStub = jest
          .spyOn(axios, 'get')
          .mockResolvedValue({ status: 200, data: {} });

        await httpService.getDataAndSetStore();

        expect(getStub).toHaveBeenCalledWith('/myUrl');
      });

      it('should set the data in store', async () => {
        const addDataStub = jest.spyOn(Store, 'setData').mockImplementation();
        const getStub = jest
          .spyOn(axios, 'get')
          .mockResolvedValue({ status: 200, data: 'myData' });
        jest.useFakeTimers();

        httpService.getDataAndSetStore();
        jest.runAllTimers();
        await Promise.resolve();

        expect(addDataStub).toHaveBeenCalledWith('myData');

        addDataStub.mockRestore();
        getStub.mockRestore();
        jest.useRealTimers();
      });
    });
  });
});

// What is to return a promise?
// Can't run "Jest: Start All Runners"
// Can/t run setup wizard