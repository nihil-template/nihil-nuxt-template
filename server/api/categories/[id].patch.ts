import type { UpdateCategory } from '~/types/categories.types';
import { DB } from '~/utils/db';

export default defineEventHandler(async (event) => {
  const { id, } = getRouterParams(event);
  const updateCategoryDto = await readBody<UpdateCategory>(event);

  const category = await DB.categories().update({
    where: { id, },
    data: updateCategoryDto,
  });

  if (!category) {
    throw createError({
      statusCode: 404,
      statusMessage: '카테고리를 찾을 수 없습니다.',
    });
  }
  return category;
});
