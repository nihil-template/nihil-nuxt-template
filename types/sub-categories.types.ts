import type { Prisma } from '@prisma/client';

export type ExSubCategory = Prisma.SubCategoryGetPayload<{
  include: {
    Keyword: true;
  };
}>;

export interface CreateSubCategory {
  categoryId: string;
  name: string;
  isProdHidden?: boolean;
}

export interface UpdateSubCategory {
  name?: string;
  isProdHidden?: boolean;
}

export interface DeleteSubCategory {
  id: string;
}

export interface DeletesSubCategories {
  ids: string[];
}




