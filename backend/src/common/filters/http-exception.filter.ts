import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let error: any = null;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        message = (exceptionResponse as any).message || message;
        error = exceptionResponse;
      }
    } else if (exception instanceof Error) {
      message = exception.message;
      error = {
        name: exception.name,
        message: exception.message,
        stack: process.env.NODE_ENV === 'development' ? exception.stack : undefined,
      };
    } else {
      // Handle non-Error objects
      message = String(exception);
      error = { message: String(exception) };
    }

    console.error('Exception caught:', {
      status,
      message,
      path: request.url,
      method: request.method,
      error: error || exception,
    });

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message,
      ...(error && typeof error === 'object' ? error : {}),
    });
  }
}


