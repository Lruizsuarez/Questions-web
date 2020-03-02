import { Injectable, Inject } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { }

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
