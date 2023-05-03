import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Company {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => ID)
  parentId: string;

  @Field(() => [Company])
  children: Company[];
}
