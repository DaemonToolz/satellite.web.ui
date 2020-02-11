import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatSidenavModule, MatToolbarModule, MatListModule, MatButtonModule, MatIconModule, MatCardModule, MatTabsModule, MatInputModule, MatFormFieldModule, MatGridListModule, MatTreeModule, MatCheckboxModule }from '@angular/material'
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
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { DatePipe } from '@angular/common';
import { HttpInterceptorService } from './services/interceptor/http-interceptor.service';

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
  ],
  imports: [
    FormsModule,
    MatTreeModule,
    NgxChartsModule,
    MatTabsModule,
    ReactiveFormsModule,
    ScrollDispatchModule,
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
    MatCheckboxModule,
    FlexLayoutModule,
    AppRoutingModule
  ],
  providers: [AccountDataService,DeactivateGuardService, AuthGuardService, UsersService, DatePipe, HttpInterceptorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
