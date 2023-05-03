import { Query, Resolver } from '@nestjs/graphql';
import { Company } from '@/company/models/company.model';
import { CompanyService } from '@/company/company.service';
import { map, of } from 'rxjs';

@Resolver(() => Company)
export class CompanyResolver {
  constructor(private readonly companyService: CompanyService) {}

  @Query(() => [Company])
  public companies() {
    return this.companyService.getCompanies().pipe(map((value) => value.data));
  }
}
