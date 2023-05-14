import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CompanyService } from '@/company/company.service';
import { map, Observable, of } from 'rxjs';
import { CompanyDto } from '@/company/dto/company.dto';
import { TravelService } from '@/travel/travel.service';
import { Company } from '@/company/models/company.model';

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
    return this.companyService
      .getCompanies()
      .pipe(
        map<Company[], Record<string, any>[]>((companies) =>
          this.companyService.buildTree(companies, '0'),
        ),
      );
  }

  // public cost(@Parent() companyDto: CompanyDto) {
  //   const { id } = companyDto;
  //   return this.travelService.getCostByCompanyId(id);
  // }
}
