export default class ApiExceptionHandler extends Error {
    statusCode: number;
    status: string;
    error?: any;
    isOperational: boolean;
    constructor(message: string, statusCode?: number | null, error?: any);
}
