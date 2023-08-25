import { t } from "i18next";

export class Result<T> {
    success: boolean;
    data?: T;
    error?: ErrorWrapper;
    pagination?: Pagination;

    constructor(isSuccess: boolean, error?: ErrorWrapper, value?: T, pagination?: Pagination) {
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

    getErrorMsg(): string {
        return this.error?.message || t('error_common')
    }
}

type ErrorWrapper = {
    message: string;
    code: number;
}

export class Success<T> extends Result<T> {
    constructor(value?: T, pagination?: Pagination) {
        super(true, undefined, value, pagination);
    }
}

export class Failure extends Result<never> {
    constructor(code: number, message: string) {
        super(false, {
            code, message
        });
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