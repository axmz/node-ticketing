import { CustomError } from './custom-error'

export class DatabaseConnectionError extends CustomError {
    statusCode = 500;
    constructor() {super('Database connection error')}
    serializeError() { 
        return {errors: [{message: 'Database connection error'}]}
    }
}
