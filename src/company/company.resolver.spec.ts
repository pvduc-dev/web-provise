import { Test, TestingModule } from '@nestjs/testing';
import { CompanyResolver } from './company.resolver';
import { CompanyService } from '@/company/company.service';
import { TravelService } from '@/travel/travel.service';
import { HttpModule } from '@nestjs/axios';

describe('CompanyResolver', () => {
  let companyResolver: CompanyResolver;
  let companyService: CompanyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [CompanyResolver, CompanyService, TravelService],
    }).compile();

    companyService = module.get<CompanyService>(CompanyService);
    companyResolver = module.get<CompanyResolver>(CompanyResolver);
  });

  it('should be defined', () => {
    expect(companyService).toBeDefined();
    expect(companyResolver).toBeDefined();
  });
});
