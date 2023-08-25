import { AxiosResponse } from "axios";
import { Failure, Result, Success } from "../data/model/Result";

export default function parseResponse<T>(response: AxiosResponse<Result<T>>): Result<T> {
    if (response.status != 200) {
        return new Failure(response.code, response.message);
    }
    return new Success(response.data.data, response.data.pagination);
}