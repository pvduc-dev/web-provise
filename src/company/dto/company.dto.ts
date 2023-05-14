import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CompanyDto {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  parentId: string;

  @Field(() => String)
  name: string;

  @Field(() => Int)
  cost: number;

  @Field(() => [CompanyDto])
  children: CompanyDto[];
}
