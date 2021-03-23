import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  public language: string = 'en';
  public darkTheme: boolean = false;

  constructor(
    private file: File,
    private platform: Platform
  ) { 
    
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
}
