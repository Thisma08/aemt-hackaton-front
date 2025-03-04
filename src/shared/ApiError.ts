export class ApiError extends Error {
    constructor(message: string) {
        super(message);
    }

    static fromResponseJson(json: any){
        return new ApiError(`${json.title}: ${json.detail}`);
    }
}