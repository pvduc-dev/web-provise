import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AxiosResponse } from 'axios';
import { Company } from '@/company/models/company.model';

@Injectable()
export class CompanyService {
  private readonly companyEndpoint = '/companies';

  constructor(private readonly httpService: HttpService) {}

  /**
   * @author Pv Duc
   */
  public getCompanies(): Observable<Company[]> {
    return this.httpService
      .get('/companies')
      .pipe(map<AxiosResponse, Company[]>((res) => res.data));
  }

  /**
   * @param flattenArr
   * @param parentId
   * @param cost
   * @author PvDuc
   */
  public buildTree(
    flattenArr: Company[],
    parentId = '0',
    cost = 0,
  ): Array<any> {
    return [
      ...flattenArr
        .filter((company: Company) => company.parentId === parentId)
        .map((child: Company) => ({
          ...child,
          children: this.buildTree(flattenArr, child.id),
          cost: 0,
        })),
    ];
  }
}
