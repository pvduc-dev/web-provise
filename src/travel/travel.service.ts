import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs';
import { Travel } from '@/travel/model/travel.model';
import { AxiosResponse } from 'axios';

@Injectable()
export class TravelService {
  constructor(private readonly httpService: HttpService) {}

  public fetchTravels() {
    return this.httpService
      .get('/travels')
      .pipe(map<AxiosResponse, Travel[]>((res) => res.data));
  }

  public getCostByCompanyIds(travels: Travel[], companyIds: string[]): number {
    return travels.reduce((acc, curr) => {
      if (companyIds.includes(curr.companyId)) {
        return acc + +curr.price;
      }
      return acc;
    }, 0);
  }
}
