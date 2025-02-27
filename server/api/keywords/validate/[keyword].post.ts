import type { SearchKeyword } from '~/types/keywords.types';
import { DB } from '~/utils/db';

export default defineEventHandler(async (event) => {
  const { subCategoryId, keyword, } = await readBody<SearchKeyword>(event);

  const keywords = await DB.keywords().findMany({
    where: {
      subCategoryId,
      keyword: {
        equals: keyword,
      },
    },
  });

  if (keywords) {
    return createError({
      statusCode: 409,
      statusMessage: '이미 존재하는 키워드입니다.',
    });
  }

  return null;
});
