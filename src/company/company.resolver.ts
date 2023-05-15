import { Query, Resolver } from '@nestjs/graphql';
import { CompanyService } from '@/company/company.service';
import { combineLatest, map, Observable } from 'rxjs';
import { TravelService } from '@/travel/travel.service';
import { CompanyDto } from '@/company/dto/company.dto';

@Resolver(() => CompanyDto)
export class CompanyResolver {
  constructor(
    private readonly companyService: CompanyService,
    private readonly travelService: TravelService,
  ) {}

  /**
   * @author PvDuc
   */
  @Query(() => [CompanyDto])
  public companies(): Observable<Record<string, any>[]> {
    return combineLatest([
      this.companyService.fetchCompanies(),
      this.travelService.fetchTravels(),
    ]).pipe(
      map(([companies, travels]) =>
        this.companyService.getCompanyChildren(companies, travels, '0'),
      ),
    );
  }
}
