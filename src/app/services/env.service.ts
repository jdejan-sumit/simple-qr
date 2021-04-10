import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';
import { ScanRecord } from '../models/scan-record';

@Injectable({
  providedIn: 'root'
})
export class EnvService {

  private _storage: Storage | null = null;
  private _scannedData: string = '';
  private _scanRecords: ScanRecord[] = [];

  constructor(
    private file: File,
    private platform: Platform,
    private storage: Storage,
  ) { 
    this.platform.ready().then(
      async () => {
        await this.init();
      }
    )
  }

  private async init() {
    const storage = await this.storage.create();
    this._storage = storage;
    await this.storageGet(environment.storageScanRecordKey).then(
      value => {
        if (value !== null && value !== undefined) {
          try {
            this._scanRecords = JSON.parse(value);
          } catch (err) {
            this._scanRecords = [];
          }
        }
      }
    );
  }

  public async storageSet(key: string, value: any) {
    await this._storage?.set(key, value);
  }

  public async storageGet(key: string): Promise<any> {
    const value = await this._storage?.get(key).then(
      value => {
        console.log("value1", value)
        return value;
      },
      err => {
        console.error("error when get from storage", err);
        return null;
      }
    );
    console.log("value2", value)
    return value;
  }

  get result(): string {
    return this._scannedData;
  }

  set result(value: string) {
    this._scannedData = value;
  }

  get baseDir(): string {
    let baseDir: string;
    if (this.platform.is('android')) {
      baseDir = this.file.externalDataDirectory;
    } else {
      baseDir = this.file.dataDirectory;
    }
    return baseDir;
  }

  get scanRecords(): ScanRecord[] {
    return this._scanRecords;
  }

  async saveScanRecord(value: string): Promise<void> {
    const record = new ScanRecord();
    record.text = value;
    record.createdAt = new Date();
    this._scanRecords.push(record);
    await this.storageSet(environment.storageScanRecordKey, JSON.stringify(this._scanRecords));
  }
}
