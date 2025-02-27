import { DB } from '~/utils/db';

export default defineEventHandler(async (event) => {
  const keywords = await DB.keywords().findMany();

  return keywords;
});
