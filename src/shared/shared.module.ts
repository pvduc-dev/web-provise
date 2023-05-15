import { Global, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        baseURL: configService.get<string>(
          'BASE_API_ENDPOINT',
          ' https://5f27781bf5d27e001612e057.mockapi.io/webprovise',
        ),
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [HttpModule],
})
export class SharedModule {}
