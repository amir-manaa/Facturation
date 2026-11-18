export class CustomerPaginatedResponseDto<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}
