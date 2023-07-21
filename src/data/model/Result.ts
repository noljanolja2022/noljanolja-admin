import { t } from "i18next";

export class Result<T> {
    success: boolean;
    data?: T;
    error?: Error;
    pagination?: Pagination;

    constructor(isSuccess: boolean, error?: Error, value?: T, pagination?: Pagination) {
        this.success = isSuccess;
        this.data = value;
        this.error = error;
        this.pagination = pagination;
    }

    isSuccess(): boolean {
        return this.success;
    }

    isFailure(): boolean {
        return !this.success;
    }

    getValue(): T | undefined {
        return this.data;
    }

    getError(): Error | undefined {
        return this.error;
    }

    getErrorMsg(): string {
        return this.error?.message || t('error_common')
    }
}

export class Success<T> extends Result<T> {
    constructor(value?: T, pagination?: Pagination) {
        super(true, undefined, value, pagination);
    }
}

export class Failure extends Result<never> {
    constructor(error: Error) {
        super(false, error);
    }
}

export interface Pagination {
    page: number;
    pageSize: number;
    total: number;
}

export function getTotalPages(data: Pagination) {
    return Math.ceil(data.total / data.pageSize)
}