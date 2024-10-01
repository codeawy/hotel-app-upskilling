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
  orderBy?: string;
};

export async function paginate<T>(
  model: any,
  options: PaginationOptions = {},
  where: any = {}
): Promise<PaginatedResult<T>> {
  const page = options.page || 1;
  const limit = options.limit || 10;
  const skip = (page - 1) * limit;

  let orderBy: { [key: string]: "asc" | "desc" } = { id: "asc" };
  if (options.orderBy) {
    const [field, direction] = options.orderBy.split(":");
    orderBy = { [field]: direction as "asc" | "desc" };
  }

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
