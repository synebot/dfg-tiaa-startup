import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { NotificationService } from '../../shared/form-helpers/notification/notification.service';
import { finalize, tap } from 'rxjs/operators';

@Injectable()
export class BaseHttpInterceptor implements HttpInterceptor {
  constructor(private notificationService: NotificationService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const started = Date.now();
    let ok: string;

    this.notificationService.setHttpBlockerRequest(req.method);
    // extend server response observable with logging
    return next.handle(req)
      .pipe(
        tap(
          // Succeeds when there is a response; ignore other events
          event => {
              ok = event instanceof HttpResponse ? 'succeeded' : '';

          },
          // Operation failed; error is an HttpErrorResponse
          error => ok = 'failed'
        ),
        // Log when response observable either completes or errors
        finalize(() => {
          const elapsed = Date.now() - started;
          const msg = `${req.method} "${req.urlWithParams}"
             ${ok} in ${elapsed} ms.`;

             this.notificationService.removeHttpBlockerRequest(`${ok}`, msg);

            // console.log(msg);
        })
      );
  }
}
