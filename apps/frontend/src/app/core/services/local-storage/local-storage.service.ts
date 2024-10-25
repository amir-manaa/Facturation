import { Injectable, inject, PLATFORM_ID, Signal, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private readonly platform = inject(PLATFORM_ID);
  private readonly onBrowser: Signal<boolean> = signal<boolean>(isPlatformBrowser(this.platform));

  getItem(key: string): string | null {
    if (this.onBrowser()) {
      return localStorage.getItem(key) as string;
    }
    return null;
  }

  setItem(key: string, value: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      localStorage.setItem(key, JSON.stringify(value));
      resolve(true);
    })
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
