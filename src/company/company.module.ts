import { Module } from '@nestjs/common';
import { CompanyService } from '@/company/company.service';
import { TravelModule } from '@/travel/travel.module';
import { CompanyResolver } from '@/company/company.resolver';

@Module({
  imports: [TravelModule],
  providers: [CompanyService, CompanyResolver],
  exports: [CompanyService],
})
export class CompanyModule {}
