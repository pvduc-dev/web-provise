import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Company {
  id: string;

  createdAt: string;

  name: string;

  parentId: string;

  children?: Company[];
}
