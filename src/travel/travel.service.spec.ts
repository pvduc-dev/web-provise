import { Test, TestingModule } from '@nestjs/testing';
import { TravelService } from './travel.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import { AxiosResponse } from 'axios';

describe('TravelService', () => {
  let travelService: TravelService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [TravelService],
    }).compile();

    travelService = module.get<TravelService>(TravelService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(httpService).toBeDefined();
    expect(travelService).toBeDefined();
  });

  describe('fetchTravels', () => {
    it('should be return a travel list', () => {
      const travelsMock = [
        {
          id: 'uuid-t1',
          createdAt: '2020-08-27T00:22:26.927Z',
          employeeName: 'Garry Schuppe',
          departure: 'Saint Kitts and Nevis',
          destination: 'Pitcairn Islands',
          price: '362.00',
          companyId: 'uuid-1',
        },
      ];
      const fetchTravelSpy = jest.spyOn(travelService, 'fetchTravels');
      const httpGetSpy = jest.spyOn(httpService, 'get').mockImplementation(() =>
        of<AxiosResponse>({
          config: undefined,
          data: travelsMock,
          headers: undefined,
          status: 200,
          statusText: '',
        }),
      );
      travelService
        .fetchTravels()
        .subscribe((value) => expect(value).toEqual(travelsMock));
      expect(fetchTravelSpy).toHaveBeenCalled();
      expect(httpGetSpy).toHaveBeenCalled();
    });
  });

  describe('getCostByCompanyIds', () => {
    it('should be return total cost of a company id list', () => {
      const getCostByCompanyIdsSpy = jest.spyOn(
        travelService,
        'getCostByCompanyIds',
      );
      travelService.getCostByCompanyIds(
        [
          {
            id: 'uuid-t20',
            createdAt: '2020-07-30T21:09:46.836Z',
            employeeName: 'Rebeca Breitenberg',
            departure: 'Nauru',
            destination: 'Panama',
            price: '735.00',
            companyId: 'uuid-5',
          },
          {
            id: 'uuid-t21',
            createdAt: '2020-09-03T10:10:46.544Z',
            employeeName: 'Misael Jones V',
            departure: 'Reunion',
            destination: 'New Caledonia',
            price: '905.00',
            companyId: 'uuid-6',
          },
          {
            id: 'uuid-t22',
            createdAt: '2020-06-15T00:50:54.420Z',
            employeeName: 'Mrs. Darryl Kilback',
            departure: 'Dominican Republic',
            destination: 'Mali',
            price: '955.00',
            companyId: 'uuid-7',
          },
        ],
        ['uuid-5', 'uuid-6'],
      );
      expect(getCostByCompanyIdsSpy).toHaveReturnedWith(1640);
    });
  });
});
