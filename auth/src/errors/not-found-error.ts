import {CustomError} from './custom-error'

export class NotFoundError extends CustomError {
    statusCode= 404
    constructor () {super('Not found')}
    serializeError() {
        return {errors: [{message: "Not found"}]}
    }
}