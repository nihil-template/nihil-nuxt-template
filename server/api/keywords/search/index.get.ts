import type { KeywordsSearchParams } from '~/types/keywords.types';
import { DB } from '~/utils/db';

export default defineEventHandler(async (event) => {
  // search 라는 이름의 쿼리 스트링을 가져옴.
  const searchParams: KeywordsSearchParams = getQuery(event);

  const { search, } = searchParams;

  const keywords = await DB.keywords().findMany({
    where: {
      keyword: {
        contains: search,
      },
    },
  });

  if (keywords.length === 0) {
    return createError({
      statusCode: 404,
      statusMessage: `"${search}" 관련 키워드가 없습니다.`,
    });
  }

  return keywords;
});
