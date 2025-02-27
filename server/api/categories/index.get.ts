import { DB } from '~/utils/db';

export default defineEventHandler(async (event) => {
  const categories = await DB.categories().findMany({
    include: {
      SubCategory: true,
    },
    orderBy: {
      order: 'asc',
    },
  });

  setResponseStatus(event, 200);
  return categories;
});
