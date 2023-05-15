import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AxiosResponse } from 'axios';
import { Company } from '@/company/models/company.model';
import { TravelService } from '@/travel/travel.service';

@Injectable()
export class CompanyService {
  constructor(
    private readonly httpService: HttpService,
    private readonly travelService: TravelService,
  ) {}

  /**
   * @author Pv Duc
   */
  public fetchCompanies(): Observable<Company[]> {
    return this.httpService
      .get('/companies')
      .pipe(map<AxiosResponse, Company[]>((res) => res.data));
  }

  public getCompanyChildren(
    companies: Company[],
    travels = [],
    parentId = '0',
  ) {
    return companies
      .filter((company: Company) => company.parentId === parentId)
      .map((child: Company) => ({
        ...child,
        cost: this.getCompanyCost(companies, travels, child.id),
        children: this.getCompanyChildren(companies, travels, child.id),
      }));
  }

  private getCompanyCost(companies, travels, parentId) {
    const companyIds = [parentId, ...this.getUnderCompany(companies, parentId)];
    return this.travelService.getCostByCompanyIds(travels, companyIds);
  }

  private getUnderCompany(companies, companyId) {
    return companies.reduce((acc, curr) => {
      if (curr.parentId === companyId) {
        return [...acc, curr.id, ...this.getUnderCompany(companies, curr.id)];
      }
      return acc;
    }, []);
  }
}
