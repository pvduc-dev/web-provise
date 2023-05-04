import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { Company } from '@/company/models/company.model';

@Injectable()
export class CompanyService {
  private readonly companyEndpoint =
    'https://5f27781bf5d27e001612e057.mockapi.io/webprovise/companies';

  constructor(private readonly httpService: HttpService) {}

  /**
   * @author Pv Duc
   */
  public getCompanies(): Observable<AxiosResponse<Company[]>> {
    return this.httpService.get(this.companyEndpoint);
  }

  /**
   * @param flattenArr
   * @param parentId
   * @author PvDuc
   */
  public buildTree(flattenArr: Company[], parentId: string): Array<any> {
    return [
      ...flattenArr
        .filter((company: Company) => company.parentId === parentId)
        .map((child: Company) => ({
          ...child,
          children: this.buildTree(flattenArr, child.id),
        })),
    ];
  }
}
