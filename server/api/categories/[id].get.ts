import { DB } from '~/utils/db';

export default defineEventHandler(async (event) => {
  const { id, } = getRouterParams(event);

  const category = await DB.categories().findUnique({
    where: { id, },
    include: {
      SubCategory: true,
    },
  });

  if (!category) {
    throw createError({
      statusCode: 404,
      statusMessage: '카테고리를 찾을 수 없습니다.',
    });
  }

  return category;
});
