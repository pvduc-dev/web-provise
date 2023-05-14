import { Module } from '@nestjs/common';
import { TravelService } from './travel.service';

@Module({
  providers: [TravelService],
  exports: [TravelService],
})
export class TravelModule {}
