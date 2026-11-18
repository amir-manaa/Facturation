import { GlobalConstants } from '@utils';

export class GetCustomersPayload {
  page: number;
  limit: number;

  constructor(
    page = GlobalConstants.pageIndex,
    limit = GlobalConstants.pageSize
  ) {
    this.page = page;
    this.limit = limit;
  }
}
