export interface ListParam {
    currentPage: number;
    pageSize: number;
    search?: string | string[];
    sort?: 'ASC' | 'DESC' | '';
}