/**
* Beautified Error
*/
interface ErrorMessage {
    message: string;
    name: string;
}

/**
* Custom Error class
*/
export class CustomError extends Error {
    private _statusCode: number
    private _name: string

    constructor(message: ErrorMessage, statusCode: number = 500) {
        super(message.message);
        this._statusCode = statusCode;
        this._name = message.name;

        // so instanceof works
        // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
        Object.setPrototypeOf(this, CustomError.prototype);
    }
    
    get statusCode() {
        return this._statusCode;
    }

    get name() {
        return this._name;
    }

}