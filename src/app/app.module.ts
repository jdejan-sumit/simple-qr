import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { SMS } from '@ionic-native/sms/ngx';
import { ThemeDetection } from '@ionic-native/theme-detection/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { OpenNativeSettings } from '@ionic-native/open-native-settings/ngx';
import { File } from '@ionic-native/file/ngx';
import { AES256 } from '@awesome-cordova-plugins/aes-256/ngx';
import { Chooser } from '@awesome-cordova-plugins/chooser/ngx';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HistoryTutorialPageModule } from './modals/history-tutorial/history-tutorial.module';
import { DatePipe } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MenuComponent } from './components/menu/menu.component';
import { QrcodeComponent } from './components/qrcode/qrcode.component';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { EnvService } from './services/env.service';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        AppComponent,
        MenuComponent,
        QrcodeComponent
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        IonicStorageModule.forRoot(),
        HistoryTutorialPageModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatSlideToggleModule,
        MatButtonModule,
        NgbModule,
        NgxQRCodeModule,
    ],
    providers: [
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        EnvService,
        AppVersion,
        CallNumber,
        DatePipe,
        File,
        OpenNativeSettings,
        SMS,
        SocialSharing,
        ThemeDetection,
        AES256,
        Chooser,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
