export type PaginatedResult<T> = {
  data: T[];
  metadata: {
    currentPage: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
  };
};

export type PaginationOptions = {
  page?: number;
  limit?: number;
  orderBy?: { [key: string]: "asc" | "desc" };
};

export async function paginate<T>(
  model: any,
  options: PaginationOptions = {},
  where: any = {}
): Promise<PaginatedResult<T>> {
  const page = options.page || 1;
  const limit = options.limit || 10;
  const orderBy = options.orderBy || { id: "asc" };
  const skip = (page - 1) * limit;

  const [data, totalItems] = await Promise.all([
    model.findMany({
      where,
      skip,
      take: limit,
      orderBy,
    }),
    model.count({ where }),
  ]);

  const totalPages = Math.ceil(totalItems / limit);

  return {
    data,
    metadata: {
      currentPage: page,
      pageSize: limit,
      totalPages,
      totalItems,
    },
  };
}
