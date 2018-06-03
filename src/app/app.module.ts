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
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { ApiListComponent } from './api-list/api-list.component';
import { ActivateAccountComponent } from './activate-account/activate-account.component';
import { CaptchaDirective } from './common/directives/captcha.directive';
import { ApiProfileComponent } from './api-profile/api-profile.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

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
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule.withServerTransition({ appId: 'caboodle' }),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ForgetPasswordComponent]
})
export class AppModule { }
