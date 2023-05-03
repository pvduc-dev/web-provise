import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { Company } from '@/company/models/company.model';

@Injectable()
export class CompanyService {
  constructor(private readonly httpService: HttpService) {}

  public getCompanies(): Observable<AxiosResponse<Company[]>> {
    return this.httpService.get(
      'https://5f27781bf5d27e001612e057.mockapi.io/webprovise/companies',
    );
  }

  /**
   * @param flattenArr
   * @param parentId
   */
  public buildTree(flattenArr: Company[], parentId: string): Array<any> {
    return flattenArr
      .filter((company) => company.parentId === parentId)
      .map((child) => ({
        ...child,
        children: this.buildTree(flattenArr, child.id),
      }));
  }
}
