import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MySpaceComponent } from './components/my-space/my-space.component';
import { AccountComponent } from './components/account/account.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HomeComponent } from './shared/home/home.component';
import { DeactivateGuardService, AuthGuardService } from './services/guards/auth-guard.service';
import { AccountDataService } from './services/account/account-data.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BackComponent } from './shared/back/back.component';
import { ChatpageComponent } from './components/chat/chatpage/chatpage.component';
import { ChatsettingsComponent } from './components/chat/chatsettings/chatsettings.component';
import { ContactsComponent } from './components/chat/contacts/contacts.component';
import { ContactpageComponent } from './components/chat/contactpage/contactpage.component';
import { FilterPipe } from './Pipes/filter-pipe.pipe';
import { UsersService } from './services/contacts/users.service';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { DatePipe } from '@angular/common';
import { HttpInterceptorService } from './services/interceptor/http-interceptor.service';
import { MatTreeModule } from '@angular/material/tree'
import { MatTabsModule } from '@angular/material/tabs'
import { MatButtonModule } from '@angular/material/button'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatListModule } from '@angular/material/list'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NotificationsComponent } from './shared/notifications/notifications.component'
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MySpaceComponent,
    AccountComponent,
    HomeComponent,
    BackComponent,
    ChatpageComponent,
    ChatsettingsComponent,
    ContactsComponent,
    ContactpageComponent,
    FilterPipe,
    NotFoundComponent,
    CalendarComponent,
    NotificationsComponent,
  ],
  imports: [
    FormsModule,
    MatTreeModule,
    NgxChartsModule,
    MatTabsModule,
    ReactiveFormsModule,
    ScrollingModule,
    BrowserAnimationsModule,
    BrowserModule,
    MatButtonModule,
    MatToolbarModule,
    MatGridListModule,
    HttpClientModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    FlexLayoutModule,
    AppRoutingModule
  ],
  providers: [ AccountDataService, DeactivateGuardService, AuthGuardService, UsersService, DatePipe, HttpInterceptorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
