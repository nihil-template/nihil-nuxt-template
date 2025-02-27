import type { CreateKeyword } from '~/types/keywords.types';
import { DB } from '~/utils/db';

export default defineEventHandler(async (event) => {
  const { subCategoryId, keywords, } = await readBody<CreateKeyword>(event);

  const keywordList = [ ...new Set(keywords), ];

  const findKeywords = await DB.keywords().findMany({
    where: {
      keyword: { in: keywordList, },
    },
  });

  if (findKeywords.length === keywordList.length) {
    throw createError({
      statusCode: 400,
      statusMessage: '이미 존재하는 키워드입니다.',
    });
  }

  const addable = keywordList.filter(
    (keyword) => {
      return !findKeywords.some((findKeyword) => (
        findKeyword.keyword === keyword
      ));
    }
  );

  const addableKeywords = addable.map(
    (keyword) => ({
      subCategoryId,
      keyword,
    })
  );

  await DB.keywords().createMany({
    data: addableKeywords,
  });

  return {
    success: addable.length,
    fail: findKeywords.length,
  };
});
