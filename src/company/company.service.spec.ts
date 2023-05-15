import { Test, TestingModule } from '@nestjs/testing';
import { CompanyService } from '@/company/company.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { TravelService } from '@/travel/travel.service';
import { of } from 'rxjs';
import { AxiosResponse } from 'axios';

describe('CompanyService', () => {
  let companyService: CompanyService;
  let httpService: HttpService;
  let travelService: TravelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [CompanyService, TravelService],
    }).compile();

    companyService = module.get<CompanyService>(CompanyService);
    httpService = module.get<HttpService>(HttpService);
    travelService = module.get<TravelService>(TravelService);
  });

  it('should be defined', () => {
    expect(companyService).toBeDefined();
    expect(httpService).toBeDefined();
    expect(travelService).toBeDefined();
  });

  describe('fetchCompanies', () => {
    it('should ', () => {
      const companies = [
        {
          id: 'uuid-1',
          createdAt: '2021-02-26T00:55:36.632Z',
          name: 'Webprovise Corp',
          parentId: '0',
        },
      ];
      const fetchCompaniesSpy = jest.spyOn(companyService, 'fetchCompanies');
      const httpGetSpy = jest.spyOn(httpService, 'get').mockImplementation(() =>
        of<AxiosResponse>({
          config: undefined,
          data: companies,
          headers: undefined,
          status: 200,
          statusText: '',
        }),
      );
      companyService
        .fetchCompanies()
        .subscribe((value) => expect(value).toEqual(companies));
      expect(fetchCompaniesSpy).toHaveBeenCalled();
      expect(httpGetSpy).toHaveBeenCalled();
    });
  });

  describe('getCompanyChildren', () => {
    it('should be return company tree', () => {
      const companies = [
        {
          id: 'uuid-1',
          createdAt: '2021-02-26T00:55:36.632Z',
          name: 'Webprovise Corp',
          parentId: '0',
        },
        {
          id: 'uuid-2',
          createdAt: '2021-02-25T10:35:32.978Z',
          name: 'Stamm LLC',
          parentId: 'uuid-1',
        },
        {
          id: 'uuid-3',
          createdAt: '2021-02-25T15:16:30.887Z',
          name: 'Blanda, Langosh and Barton',
          parentId: 'uuid-1',
        },
        {
          id: 'uuid-4',
          createdAt: '2021-02-25T06:11:47.519Z',
          name: 'Price and Sons',
          parentId: 'uuid-2',
        },
      ];
      const travels = [
        {
          id: 'uuid-t1',
          createdAt: '2020-08-27T00:22:26.927Z',
          employeeName: 'Garry Schuppe',
          departure: 'Saint Kitts and Nevis',
          destination: 'Pitcairn Islands',
          price: '362.00',
          companyId: 'uuid-1',
        },
        {
          id: 'uuid-t2',
          createdAt: '2020-11-08T22:44:37.483Z',
          employeeName: 'Alison Kohler Sr.',
          departure: 'Guatemala',
          destination: 'Belgium',
          price: '835.00',
          companyId: 'uuid-2',
        },
        {
          id: 'uuid-t3',
          createdAt: '2020-05-18T16:41:55.992Z',
          employeeName: 'Cheyenne Turcotte',
          departure: 'Somalia',
          destination: 'Wallis and Futuna',
          price: '859.00',
          companyId: 'uuid-1',
        },
        {
          id: 'uuid-t4',
          createdAt: '2020-07-24T16:17:38.334Z',
          employeeName: 'Marielle Bartoletti',
          departure: 'Uganda',
          destination: 'Saint Helena',
          price: '191.00',
          companyId: 'uuid-2',
        },
      ];
      const companyTree = companyService.getCompanyChildren(
        companies,
        travels,
        '0',
      );
      expect(companyTree).toEqual([
        {
          id: 'uuid-1',
          name: 'Webprovise Corp',
          createdAt: '2021-02-26T00:55:36.632Z',
          parentId: '0',
          cost: 2247,
          children: [
            {
              id: 'uuid-2',
              name: 'Stamm LLC',
              createdAt: '2021-02-25T10:35:32.978Z',
              parentId: 'uuid-1',
              cost: 1026,
              children: [
                {
                  id: 'uuid-4',
                  name: 'Price and Sons',
                  createdAt: '2021-02-25T06:11:47.519Z',
                  parentId: 'uuid-2',
                  cost: 0,
                  children: [],
                },
              ],
            },
            {
              id: 'uuid-3',
              name: 'Blanda, Langosh and Barton',
              createdAt: '2021-02-25T15:16:30.887Z',
              parentId: 'uuid-1',
              cost: 0,
              children: [],
            },
          ],
        },
      ]);
    });
  });
});
