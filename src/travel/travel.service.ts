import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, Observable } from 'rxjs';
import { Travel } from '@/travel/model/travel.model';
import { AxiosResponse } from 'axios';

@Injectable()
export class TravelService {
  constructor(private readonly httpService: HttpService) {}

  public getCostByCompanyId(companyId: string): Observable<number> {
    return this.httpService
      .get('/travels', {
        params: {
          companyId,
        },
      })
      .pipe(
        map<AxiosResponse, Travel[]>((res) => res.data),
        map<Travel[], number>((travels) =>
          travels.reduce((acc, curr) => acc + +curr.price, 0),
        ),
      );
  }
}
