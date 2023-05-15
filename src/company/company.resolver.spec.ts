import { Test, TestingModule } from '@nestjs/testing';
import { CompanyResolver } from './company.resolver';
import { CompanyService } from '@/company/company.service';
import { TravelService } from '@/travel/travel.service';
import { HttpModule } from '@nestjs/axios';
import { of } from 'rxjs';
import { Travel } from '@/travel/model/travel.model';
import { Company } from '@/company/models/company.model';

describe('CompanyResolver', () => {
  let companyResolver: CompanyResolver;
  let companyService: CompanyService;
  let travelService: TravelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [CompanyResolver, CompanyService, TravelService],
    }).compile();

    companyService = module.get<CompanyService>(CompanyService);
    companyResolver = module.get<CompanyResolver>(CompanyResolver);
    travelService = module.get<TravelService>(TravelService);
  });

  it('should be defined', () => {
    expect(companyService).toBeDefined();
    expect(companyResolver).toBeDefined();
  });

  describe('companies', function () {
    it('should be call fetchCompanies method', function () {
      const fetchCompaniesSpy = jest.spyOn(companyService, 'fetchCompanies');
      companyResolver.companies();
      expect(fetchCompaniesSpy).toHaveBeenCalled();
    });

    it('should be call fetchTravels method', function () {
      const fetchTravelSpy = jest.spyOn(travelService, 'fetchTravels');
      companyResolver.companies();
      expect(fetchTravelSpy).toHaveBeenCalled();
    });

    it('should be call getCompanyChildren method with expect params', function () {
      const companiesMock = [
        {
          id: 'uuid-4',
          createdAt: '2021-02-25T06:11:47.519Z',
          name: 'Price and Sons',
          parentId: 'uuid-2',
        },
      ];
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
      jest
        .spyOn(companyService, 'fetchCompanies')
        .mockImplementation(() => of<Company[]>(companiesMock));
      jest
        .spyOn(travelService, 'fetchTravels')
        .mockImplementation(() => of<Travel[]>(travelsMock));
      const getCompanyChildrenSpy = jest.spyOn(
        companyService,
        'getCompanyChildren',
      );
      companyResolver.companies().subscribe(() => {
        expect(getCompanyChildrenSpy).toHaveBeenCalledWith(
          companiesMock,
          travelsMock,
          '0'
        );
      });
    });
  });
});
