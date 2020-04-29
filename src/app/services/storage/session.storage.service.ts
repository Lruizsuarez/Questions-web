import { Injectable, Inject, InjectionToken } from '@angular/core';
import { StorageService } from 'ngx-webstorage-service';

export const STORAGE_SERVICE = new InjectionToken<StorageService>('STORAGE_SERVICE');

@Injectable()
export class SessionStorageService {

  constructor(@Inject(STORAGE_SERVICE) private storage: StorageService) { }

  public store(key: string, value: any): void {
    this.storage.set(key, value);
  }

  public hasKey(key: string): boolean {
    return this.storage.has(key);
  }


  public get(key: string): any {
    return this.storage.get(key);
  }

  public getAsJson(key: string): any {
    return JSON.parse(this.storage.get(key));
  }

  public remove(key: string): void {
    this.storage.remove(key);
  }

  public clear(): void {
    this.storage.clear();
  }
}
