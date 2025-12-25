import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthStore } from "./auth.store";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authStore: AuthStore) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.authStore.token();
    if (!token) return next.handle(req);

    return next.handle(
      req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
    );
  }
}
