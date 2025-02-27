import { DB } from '~/utils/db';

export default defineEventHandler(async (event) => {
  const { id, } = getRouterParams(event);

  const subCategory = await DB.subCategories().findUnique({
    where: { id, },
    include: {
      Keyword: true,
    },
  });

  return subCategory;
});
