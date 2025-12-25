import { HttpHandler, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { AuthStore } from "./auth.store";
import { inject } from "@angular/core";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthStore);
  const authRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${auth.token()}`
    }
  })
  return next(authRequest);

}
