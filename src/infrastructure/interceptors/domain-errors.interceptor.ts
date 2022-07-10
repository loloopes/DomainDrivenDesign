import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
  NotFoundException as HttpNotFoundException,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';
import { NotFoundException } from '../../domain/exception/not-found.exception';
import { DomainException } from '../../domain/exception/domain.exception';

@Injectable()
export class DomainErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof DomainException) {
          throw new BadRequestException(error.message);
        }

        if (error instanceof NotFoundException) {
          throw new HttpNotFoundException(error.message);
        }

        throw error;
      }),
    );
  }
}
