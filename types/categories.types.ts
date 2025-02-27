import type { Prisma } from '@prisma/client';

export type ExCategory = Prisma.CategoryGetPayload<{
  include: {
    SubCategory: true;
  };
}>;

export interface CreateCategory {
  name: string;
  order: number;
  isProdHidden?: boolean;
}

export interface UpdateCategory {
  id: string;
  name?: string;
  order?: number;
  isProdHidden?: boolean;
}

export interface DeleteCategory {
  id: string;
}

export interface DeletesCategories {
  ids: string[];
}
