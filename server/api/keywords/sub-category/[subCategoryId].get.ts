import { DB } from '~/utils/db';

export default defineEventHandler(async (event) => {
  const { subCategoryId, } = getRouterParams(event);

  const keywords = await DB.keywords().findMany({
    where: {
      subCategoryId,
    },
  });

  return keywords;
});
