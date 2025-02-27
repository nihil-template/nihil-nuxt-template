import type { UpdateSubCategory } from '~/types/sub-categories.types';
import { DB } from '~/utils/db';

export default defineEventHandler(async (event) => {
  const { id, } = getRouterParams(event);

  const { name, } = await readBody<UpdateSubCategory>(event);

  const findSubCategory = await DB.subCategories().findUnique({
    where: { id, },
  });

  if (findSubCategory) {
    throw createError({
      statusCode: 400,
      statusMessage: '이미 존재하는 서브 카테고리 이름입니다.',
    });
  }

  const subCategory = await DB.subCategories().update({
    where: { id, },
    data: { name, },
  });

  return subCategory;
});
