import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Company {
  id: string;

  name: string;

  parentId: string;

  children?: Company[];
}
