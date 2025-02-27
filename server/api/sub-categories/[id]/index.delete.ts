import { DB } from '~/utils/db';

export default defineEventHandler(async (event) => {
  const { id, } = getRouterParams(event);

  const findSubCategory = await DB.subCategories().findUnique({
    where: { id, },
  });

  if (!findSubCategory) {
    throw createError({
      statusCode: 404,
      statusMessage: '서브 카테고리를 찾을 수 없습니다.',
    });
  }

  const subCategory = await DB.subCategories().delete({
    where: { id, },
  });

  return subCategory;
});
