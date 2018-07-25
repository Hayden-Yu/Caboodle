import { AccountProfileComponent } from './account-profile/account-profile.component';
import { ActivateAccountComponent } from './activate-account/activate-account.component';
import { RegisterComponent } from './register/register.component';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ApiCollectionComponent } from './api-collection/api-collection.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ForumComponent } from './forum/forum.component';
import { ForumContentComponent } from './forum-content/forum-content.component';
import { ForumSubjectCreateComponent } from './forum-subject-create/forum-subject-create.component';
import { EndpointComponent } from './endpoint/endpoint.component';
import { ApiCollectionCreateComponent } from './api-collection/api-collection-create/api-collection-create.component';
import { ApiCollectionProfileComponent } from './api-collection/api-collection-profile/api-collection-profile.component';

export const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', redirectTo: 'signup' },
  { path: 'signup', component: RegisterComponent },
  { path: 'activate/:code', component: ActivateAccountComponent},
  { path: '', component: HomeComponent },
  { path: 'forum-content/:id', component: ForumContentComponent },
  { path: 'forum-subject-create', component: ForumSubjectCreateComponent },
  { path: 'forum', component: ForumComponent },
  {
    path: 'collection',
    component: ApiCollectionComponent,
    children: [
      { path: 'detail/:id', component: ApiCollectionProfileComponent },
      { path: 'create', component: ApiCollectionCreateComponent },
    ]
  },
  { path: 'endpoint/:id', component: EndpointComponent },
  { path: 'endpoint', component: EndpointComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'contact', component: ContactUsComponent },
  { path: 'home', component: AccountProfileComponent },
  { path: '**', component: PageNotFoundComponent }
];
export const routing = RouterModule.forRoot(appRoutes);
