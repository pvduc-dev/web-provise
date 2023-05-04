import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { Company } from '@/company/models/company.model';
import { CompanyService } from '@/company/company.service';
import { map, Observable } from 'rxjs';

@Resolver(() => Company)
export class CompanyResolver {
  constructor(private readonly companyService: CompanyService) {}

  /**
   * @param id {String} - The company id to get
   * @author PvDuc
   */
  @Query(() => [Company])
  public companies(
    @Args('id', { type: () => ID }) id: string,
  ): Observable<Record<string, any>[]> {
    return this.companyService.getCompanies().pipe(
      map((res) => res.data),
      map((companies) => this.companyService.buildTree(companies, id)),
    );
  }
}
