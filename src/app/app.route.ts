import { ActivateAccountComponent } from './activate-account/activate-account.component';
import { Component } from '@angular/core';
import { RegisterComponent } from './register/register.component';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ApiListComponent } from './api-list/api-list.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ApiProfileComponent } from './api-profile/api-profile.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ForumComponent } from './forum/forum.component';
import { ForumContentComponent } from './forum-content/forum-content.component';
import { ForumSubjectCreateComponent } from './forum-subject-create/forum-subject-create.component';

export const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },
  { path: 'activate/:code', component: ActivateAccountComponent},
  { path: 'home', component: HomeComponent },
  { path: 'forum-content', component: ForumContentComponent },
  { path: 'forum-subject-create', component: ForumSubjectCreateComponent },
  { path: 'forum', component: ForumComponent },
  { path: 'listings', component: ApiListComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'contact', component: ContactUsComponent },
  { path: 'apiprofile', component: ApiProfileComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];
export const routing = RouterModule.forRoot(appRoutes);
