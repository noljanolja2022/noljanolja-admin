import { AxiosResponse } from "axios";
import { Failure, Result, Success } from "../data/model/Result";

export default function parseResponse<T>(response: AxiosResponse<Result<T>>): Result<T> {
    if (response.status != 200) {
        return new Failure(new Error(response.statusText));
    }
    return new Success(response.data.data);
}