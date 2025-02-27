import type { CreateCategory } from '~/types/categories.types';
import { DB } from '~/utils/db';

export default defineEventHandler(async (event) => {
  const createCategoryDto = await readBody<CreateCategory>(event);

  const findCategory = await DB.categories().findUnique({
    where: {
      name: createCategoryDto.name,
    },
  });

  if (findCategory) {
    throw createError({
      statusCode: 400,
      statusMessage: '이미 존재하는 카테고리입니다.',
    });
  }

  const category = await DB.categories().create({
    data: createCategoryDto,
  });

  setResponseStatus(event, 201);
  return category;
});
