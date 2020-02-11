import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MySpaceComponent } from './components/my-space/my-space.component';
import { AccountComponent } from './components/account/account.component';
import { HomeComponent } from './shared/home/home.component';
import { AuthGuardService, DeactivateGuardService } from './services/guards/auth-guard.service';
import { ChatsettingsComponent } from './components/chat/chatsettings/chatsettings.component';
import { ChatpageComponent } from './components/chat/chatpage/chatpage.component';
import { ContactpageComponent } from './components/chat/contactpage/contactpage.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { CalendarComponent } from './components/calendar/calendar.component'; 

const routes: Routes = [
  {path:'myspace', component:MySpaceComponent, canActivate: [AuthGuardService] },
  {path:'myspace/:folderId', component:MySpaceComponent, canActivate: [AuthGuardService] },
  {path:'myspace/:fileId', component:MySpaceComponent, canActivate: [AuthGuardService] },
  
  {path:'mycalendar', component:CalendarComponent},

  {path:'account', component:AccountComponent, canActivate: [AuthGuardService] },

  {path:'chat/settings', component:ChatsettingsComponent, canActivate: [AuthGuardService] },
  {path:'chat/contacts', component:ContactpageComponent, canActivate: [AuthGuardService] },
  {path:'chat/:id', component:ChatpageComponent, canActivate: [AuthGuardService] },

  {path: '', component: HomeComponent },
  {path: 'home', component: HomeComponent },
  
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
