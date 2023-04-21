export class Result<T> {
    success: boolean;
    data?: T;
    error?: Error;

    constructor(isSuccess: boolean, error?: Error, value?: T) {
        this.success = isSuccess;
        this.data = value;
        this.error = error;
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
        return this.error?.message || 'An error has occured'
    }
}

export class Success<T> extends Result<T> {
    constructor(value?: T) {
        super(true, undefined, value);
    }
}

export class Failure extends Result<never> {
    constructor(error: Error) {
        super(false, error);
    }
}