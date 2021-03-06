import { ApiAuthInterceptor } from './common/api-auth-interceptor';
import { ForgetPasswordComponent } from './login/forget-password/forget-password.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { routing } from './app.route';
import { AppComponent } from './app.component';
import { FooterComponent } from './shell/footer/footer.component';
import { NavbarComponent } from './shell/navbar/navbar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { ApiCollectionComponent } from './api-collection/api-collection.component';
import { ActivateAccountComponent } from './activate-account/activate-account.component';
import { CaptchaDirective } from './common/directives/captcha.directive';
import { ApiCollectionProfileComponent } from './api-collection/api-collection-profile/api-collection-profile.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ForumComponent } from './forum/forum.component';
import { ForumContentComponent } from './forum-content/forum-content.component';
import { ForumSubjectCreateComponent } from './forum-subject-create/forum-subject-create.component';
import { AccountProfileComponent } from './account-profile/account-profile.component';
import { CollectionEndpointListComponent } from './collection-endpoint-list/collection-endpoint-list.component';
import { UpdateAccountComponent } from './account-profile/update-account/update-account.component';
// tslint:disable-next-line:max-line-length
import { CollectionEndpointListDeleteConfirmationComponent } from './collection-endpoint-list/delete-confirmation/delete-confirmation.component';
import { ApiSearchComponent } from './api-search/api-search.component';
import { LoadingSpinnerComponent } from './shell/loading-spinner/loading-spinner.component';
import { EndpointComponent } from './endpoint/endpoint.component';
import { EndpointRequestComponent } from './endpoint/endpoint-request/endpoint-request.component';
import { EndpointResultComponent } from './endpoint/endpoint-result/endpoint-result.component';
import { ApiCollectionCreateComponent } from './api-collection/api-collection-create/api-collection-create.component';
import { JsonEditorComponent } from './json-editor/json-editor.component';
import { SelectCollectionComponent } from './endpoint/select-collection/select-collection.component';
import { EndpointCreateComponent } from './endpoint/endpoint-create/endpoint-create.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    PageNotFoundComponent,
    HomeComponent,
    LoginComponent,
    ForgetPasswordComponent,
    RegisterComponent,
    ApiCollectionComponent,
    ActivateAccountComponent,
    CaptchaDirective,
    ApiCollectionProfileComponent,
    AboutUsComponent,
    ContactUsComponent,
    ForumContentComponent,
    ForumSubjectCreateComponent,
    ForumComponent,
    AccountProfileComponent,
    CollectionEndpointListComponent,
    UpdateAccountComponent,
    CollectionEndpointListDeleteConfirmationComponent,
    ApiSearchComponent,
    LoadingSpinnerComponent,
    EndpointComponent,
    EndpointRequestComponent,
    EndpointResultComponent,
    ApiCollectionCreateComponent,
    JsonEditorComponent,
    SelectCollectionComponent,
    EndpointCreateComponent,
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
    CollectionEndpointListDeleteConfirmationComponent,
    EndpointCreateComponent,
  ]
})
export class AppModule { }
