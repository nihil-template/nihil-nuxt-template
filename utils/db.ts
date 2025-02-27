import { PrismaClient } from '@prisma/client';

export class DB {
  static client() {
    return new PrismaClient();
  }

  static categories() {
    return this.client().category;
  }

  static subCategories() {
    return this.client().subCategory;
  }

  static keywords() {
    return this.client().keyword;
  }
}
