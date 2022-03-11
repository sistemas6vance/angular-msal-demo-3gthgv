import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { RouterModule, Routes } from '@angular/router';
import { MsalModule, MsalGuard, MsalInterceptor } from '@azure/msal-angular';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";

import { ProfileService } from './profile/profile.service';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'profile', component: ProfileComponent, canActivate : [MsalGuard] },
  { path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }  
];
export const protectedResourceMap:[string, string[]][]=[ ['https://buildtodoservice.azurewebsites.net/api/todolist',['api://a88bb933-319c-41b5-9f04-eff36d985612/access_as_user']] , ['https://graph.microsoft.com/v1.0/me', ['user.read']] ];



@NgModule({
  imports:      [ 
    BrowserModule, 
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes,{useHash:true}),
     MsalModule.forRoot({
                    clientID: "5b0169f7-4491-4218-a671-5610bbcaabc1",
                    authority: "https://login.microsoftonline.com/common/",
                    validateAuthority: true,
                    redirectUri: "https://angular-msal-demo.stackblitz.io/",
                    cacheLocation : "localStorage",
                    postLogoutRedirectUri: "https://angular-msal-demo.stackblitz.io/",
                    navigateToLoginRequestUrl: true,
                    popUp: false,
                    consentScopes: [ "user.read", "api://a88bb933-319c-41b5-9f04-eff36d985612/access_as_user"],
                    unprotectedResources: ["https://www.microsoft.com/en-us/"],
                    protectedResourceMap: protectedResourceMap
                })
  ],
  providers: [ProfileService,
     {provide: HTTP_INTERCEPTORS, useClass: MsalInterceptor, multi: true}
  ],
  declarations: [ AppComponent, HelloComponent, HomeComponent, ProfileComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
