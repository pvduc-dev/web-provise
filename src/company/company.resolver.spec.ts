import { Test, TestingModule } from '@nestjs/testing';
import { CompanyResolver } from './company.resolver';
import { CompanyService } from '@/company/company.service';
import { of } from 'rxjs';
import { TravelModule } from '@/travel/travel.module';
import { SharedModule } from '@/shared/shared.module';
import { TravelService } from '@/travel/travel.service';
import { HttpService } from '@nestjs/axios';

describe('CompanyResolver', () => {
  let companyResolver: CompanyResolver;
  let companyService: CompanyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanyService, CompanyResolver],
      imports: [SharedModule, TravelModule],
    }).compile();

    companyService = module.get<CompanyService>(CompanyService);
    companyResolver = module.get<CompanyResolver>(CompanyResolver);
  });

  it('should be defined', () => {
    expect(companyResolver).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of company', async () => {
      jest
        .spyOn(companyService, 'getCompanies')
        .mockImplementation(() => of([]));
      companyResolver.companies().subscribe((next) => {
        expect(next).toBe([]);
      });
    });
  });
});
