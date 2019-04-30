export interface Result<T> {
    code: number;
    currentPage?: number;
    pageSize?: number;
    total?: number;
    data?: T;
}