import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderInterrceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = request.clone({
            setHeaders: {
                'Cache-Control': 'no-cache'
            }
        })
        return next.handle(request);
    }

    // {
    //     provide: HTTP_INTERCEPTORS,
    //     useClass: HeaderInterrceptor,
    //     multi: true
    //   }
}
