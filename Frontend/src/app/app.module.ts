import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { HeaderComponent } from './header/header.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AddBoatComponent } from './add-boat/add-boat.component';
import { SeasonDurationComponent } from './season-duration/season-duration.component';
import { AllBoatComponent } from './all-boat/all-boat.component';
import { ViewBoatComponent } from './view-boat/view-boat.component';
import { AddOwnerComponent } from './add-owner/add-owner.component';
import { AllOwnersComponent } from './all-owners/all-owners.component';
import { OwnerDurationComponent } from './owner-duration/owner-duration.component';
import { ShareAlloctionComponent } from './share-alloction/share-alloction.component';
import { ViewOwnerComponent } from './view-owner/view-owner.component';
import {GetServiceService} from './get-service.service';
import { SettingsComponent } from './settings/settings.component';
import { EditBoatComponent } from './edit-boat/edit-boat.component';
import { ManageOwnerComponent } from './manage-owner/manage-owner.component';
import { NgxSpinnerModule } from "ngx-spinner"; 
import { JwPaginationModule } from 'jw-angular-pagination';

//import { TempShedulerFirstComponent } from './temp-sheduler-first/temp-sheduler-first.component';

import { OwnerLoginComponent } from './owner-login/owner-login.component';
import { ForgotPasswordOwnerComponent } from './forgot-password-owner/forgot-password-owner.component';
import { ResetPasswordOwnerComponent } from './reset-password-owner/reset-password-owner.component';
import { OwnerSidemenuComponent } from './owner-sidemenu/owner-sidemenu.component';
import { OwnerDashboardComponent } from './owner-dashboard/owner-dashboard.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { HistoryComponent } from './history/history.component';
import { FooterAdminsessionComponent } from './footer-adminsession/footer-adminsession.component';
import { AdminBookingComponent } from './admin-booking/admin-booking.component';
import { EditOwnerComponent } from './edit-owner/edit-owner.component';
import { EditOwnerProfileComponent } from './edit-owner-profile/edit-owner-profile.component';
import { ArchiveBoatComponent } from './archive-boat/archive-boat.component';

import { OwnershipTransferComponent } from './ownership-transfer/ownership-transfer.component';
import { BoatBookingsComponent } from './boat-bookings/boat-bookings.component';
import { BoatMaintenanceComponent } from './boat-maintenance/boat-maintenance.component';
import { CancellationComponent } from './cancellation/cancellation.component';
import { BookForOwnerComponent } from './book-for-owner/book-for-owner.component';
import { ReportAvailableBoatComponent } from './report-available-boat/report-available-boat.component';


import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ReportOwnershipComponent } from './report-ownership/report-ownership.component';
import { ReportOwnerComponent } from './report-owner/report-owner.component';
import { ReportBoatComponent } from './report-boat/report-boat.component';
import { ReportBookingComponent } from './report-booking/report-booking.component';
import { OwnerHeaderComponent } from './owner-header/owner-header.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SidemenuComponent,
    HeaderComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    AddBoatComponent,
    SeasonDurationComponent,
    AllBoatComponent,
    ViewBoatComponent,
    AddOwnerComponent,
    AllOwnersComponent,
    OwnerDurationComponent,
    ShareAlloctionComponent,
    ViewOwnerComponent,
    SettingsComponent,
    EditBoatComponent,
    ManageOwnerComponent,
   // TempShedulerFirstComponent,
    OwnerLoginComponent,
    ForgotPasswordOwnerComponent,
    ResetPasswordOwnerComponent,
    OwnerSidemenuComponent,
    OwnerDashboardComponent,
    MyprofileComponent,
    HistoryComponent,
    FooterAdminsessionComponent,
    AdminBookingComponent,
    EditOwnerComponent,
    EditOwnerProfileComponent,
    ArchiveBoatComponent,
    OwnershipTransferComponent, 
    BoatBookingsComponent ,
    BoatMaintenanceComponent ,
    CancellationComponent,
    BookForOwnerComponent,
    ReportAvailableBoatComponent,
    ReportOwnershipComponent,
    ReportOwnerComponent,
    ReportBoatComponent,
    ReportBookingComponent,
    OwnerHeaderComponent,

  ],
  imports: [
    JwPaginationModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    NgxSpinnerModule,
    NgMultiSelectDropDownModule.forRoot(),
    
  ],
  providers: [GetServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
