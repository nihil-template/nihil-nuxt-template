import type { CreateSubCategory } from '~/types/sub-categories.types';
import { DB } from '~/utils/db';

export default defineEventHandler(async (event) => {
  const createSubCategoryDto = await readBody<CreateSubCategory>(event);

  const findSubCategory = await DB.subCategories().findUnique({
    where: {
      name: createSubCategoryDto.name,
    },
  });

  const subCategory = await DB.subCategories().create({
    data: createSubCategoryDto,
  });

  if (findSubCategory) {
    throw createError({
      statusCode: 400,
      statusMessage: '이미 존재하는 서브 카테고리입니다.',
    });
  }

  return subCategory;
});
