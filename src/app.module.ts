import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { TravelModule } from './travel/travel.module';
import { SharedModule } from './shared/shared.module';
import { CompanyModule } from '@/company/company.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
      // plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    SharedModule,
    CompanyModule,
    TravelModule,
  ],
})
export class AppModule {}
