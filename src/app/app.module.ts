import { ApiAuthInterceptor } from './common/api-auth-interceptor';
import { ForgetPasswordComponent } from './login/forget-password/forget-password.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { routing } from './app.route';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shell/header/header.component';
import { FooterComponent } from './shell/footer/footer.component';
import { NavbarComponent } from './shell/navbar/navbar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ContentComponent } from './shell/content/content.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { ApiListComponent } from './api-list/api-list.component';
import { ActivateAccountComponent } from './activate-account/activate-account.component';
import { CaptchaDirective } from './common/directives/captcha.directive';
import { ApiProfileComponent } from './api-profile/api-profile.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AccountProfileComponent } from './account-profile/account-profile.component';
import { CollectionEndpointListComponent } from './collection-endpoint-list/collection-endpoint-list.component';
import { UpdateAccountComponent } from './account-profile/update-account/update-account.component';
// tslint:disable-next-line:max-line-length
import { CollectionEndpointListDeleteConfirmationComponent } from './collection-endpoint-list/delete-confirmation/delete-confirmation.component';
import { ApiSearchComponent } from './api-search/api-search.component';
import { LoadingSpinnerComponent } from './shell/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    PageNotFoundComponent,
    HomeComponent,
    LoginComponent,
    ForgetPasswordComponent,
    ContentComponent,
    RegisterComponent,
    ApiListComponent,
    ActivateAccountComponent,
    CaptchaDirective,
    ApiProfileComponent,
    AboutUsComponent,
    ContactUsComponent,
    AccountProfileComponent,
    CollectionEndpointListComponent,
    UpdateAccountComponent,
    CollectionEndpointListDeleteConfirmationComponent,
    ApiSearchComponent,
    LoadingSpinnerComponent,
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule.withServerTransition({ appId: 'caboodle' }),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    routing
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiAuthInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ForgetPasswordComponent,
    UpdateAccountComponent,
    CollectionEndpointListDeleteConfirmationComponent
  ]
})
export class AppModule { }
