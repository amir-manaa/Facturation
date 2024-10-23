import { Injectable, inject, Injector, afterNextRender } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private readonly injector = inject(Injector);

  getItem(key: string) {
    return new Promise((resolve, reject) => {
      afterNextRender({
        earlyRead: () => {
          const apiResponse = localStorage.getItem(key) as string;
          resolve(JSON.parse(apiResponse));
        }
      })
    })
  }

  setItem(key: string, value: string): Promise<boolean> {
    return new Promise((resolve) => {
      localStorage.setItem(key, JSON.stringify(value));
      resolve(true);
      /*afterNextRender({
        write: () => {
          localStorage.setItem(key, JSON.stringify(value));
          resolve(true);
        }
      },{injector: this.injector});*/
    });
  }

  removeItem(key: string): Promise<boolean> {
    return new Promise((resolve) => {
      localStorage.removeItem(key);
      resolve(true);
      /*afterNextRender({
        write: () => {
          localStorage.removeItem(key);
          resolve(true);
        }
      },{injector: this.injector});*/
    });
  }
}
