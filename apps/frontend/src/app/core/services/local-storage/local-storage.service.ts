import { Injectable, inject, Injector, afterNextRender, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private readonly injector = inject(Injector);
  private readonly currentUser = signal<null | string>(null);
  
  async getItem(key: string) {
    await afterNextRender({
      earlyRead: () => {
        const accessToken = localStorage.getItem(key) as string;
        this.currentUser.set(JSON.parse(accessToken));
      }
    },{injector: this.injector});
  }

  setItem(key: string, value: string): Promise<boolean> {
    return new Promise((resolve) => {
      const action = afterNextRender({
        write: () => {
          localStorage.setItem(key, JSON.stringify(value));
        }
      },{injector: this.injector});
      if (action) {
        resolve(true);
      }
    });
  }

  removeItem(key: string): Promise<boolean> {
    return new Promise((resolve) => {
      const action = afterNextRender({
        write: () => {
          localStorage.removeItem(key);
        }
      },{injector: this.injector});
      if (action) {
        resolve(true);
      }
    });
  }
}
