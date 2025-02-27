import { DB } from '~/utils/db';

export default defineEventHandler(async (event) => {
  const subCategories = await DB.subCategories().findMany({
    include: {
      Keyword: true,
    },
  });

  return subCategories;
});
