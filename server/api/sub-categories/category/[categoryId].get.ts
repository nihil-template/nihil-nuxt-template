import { DB } from '~/utils/db';

export default defineEventHandler(async (event) => {
  const { categoryId, } = getRouterParams(event);

  const subCategories = await DB.subCategories().findMany({
    where: {
      categoryId,
    },
    include: {
      Keyword: true,
    },
  });

  return subCategories;
});
