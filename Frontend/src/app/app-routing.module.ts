import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
import { SettingsComponent } from './settings/settings.component';
import { EditBoatComponent } from './edit-boat/edit-boat.component';
import { ManageOwnerComponent } from './manage-owner/manage-owner.component';
import { OwnerLoginComponent } from './owner-login/owner-login.component';
import { ForgotPasswordOwnerComponent } from './forgot-password-owner/forgot-password-owner.component';
import { ResetPasswordOwnerComponent} from './reset-password-owner/reset-password-owner.component';
import { OwnerSidemenuComponent } from './owner-sidemenu/owner-sidemenu.component';
import { OwnerDashboardComponent } from './owner-dashboard/owner-dashboard.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { HistoryComponent } from './history/history.component';
import {AdminBookingComponent} from './admin-booking/admin-booking.component';
import { EditOwnerComponent } from './edit-owner/edit-owner.component';
import { EditOwnerProfileComponent } from './edit-owner-profile/edit-owner-profile.component';
import { ArchiveBoatComponent } from './archive-boat/archive-boat.component';
import { OwnershipTransferComponent } from './ownership-transfer/ownership-transfer.component';
import { BoatBookingsComponent } from './boat-bookings/boat-bookings.component';
import { BoatMaintenanceComponent } from './boat-maintenance/boat-maintenance.component';
import { CancellationComponent } from './cancellation/cancellation.component';
import { BookForOwnerComponent } from './book-for-owner/book-for-owner.component';
import { ReportAvailableBoatComponent } from './report-available-boat/report-available-boat.component';
import { ReportOwnershipComponent }from './report-ownership/report-ownership.component';
import { ReportOwnerComponent } from './report-owner/report-owner.component';
import { ReportBoatComponent } from './report-boat/report-boat.component';
import { ReportBookingComponent } from './report-booking/report-booking.component';
import { BookingDetailsComponent} from './booking-details/booking-details.component';
import { TestTestComponent } from './test-test/test-test.component';
import { ViewBoatOwnerComponent } from './view-boat-owner/view-boat-owner.component';
import { AddAdminComponent } from './add-admin/add-admin.component';
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'forgot', component: ForgotPasswordComponent },
  { path: 'reset', component: ResetPasswordComponent },
  { path: 'add-boat', component: AddBoatComponent },
  { path: 'season-duration', component: SeasonDurationComponent },
  //Change all boat url  for app routing module Done By Alagesan on 25.06.2021	
  { path: 'all-boats', component: AllBoatComponent },
  { path: 'view-boat', component: ViewBoatComponent },
  { path: 'edit-boat', component: EditBoatComponent },
  { path: 'add-owner', component: AddOwnerComponent },
  { path: 'all-owner', component: AllOwnersComponent },
  { path: 'owner-duration', component: OwnerDurationComponent },
  { path: 'share-alloction', component: ShareAlloctionComponent },
  { path: 'view-owner', component: ViewOwnerComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'manage-owner', component: ManageOwnerComponent },
  { path: 'owner-login', component: OwnerLoginComponent },
  { path: 'forgot-password-owner', component: ForgotPasswordOwnerComponent },
  { path: 'reset-password-owner', component: ResetPasswordOwnerComponent},
  { path: 'owner-side-menu' , component: OwnerSidemenuComponent},
  { path: 'owner-dashboard', component: OwnerDashboardComponent},
  { path: 'myprofile' , component: MyprofileComponent},
  { path: 'history' , component: HistoryComponent},
  { path: 'AdminBooking',component: AdminBookingComponent},
  { path: 'edit-owner', component: EditOwnerComponent },
  { path: 'edit-owner-profile', component: EditOwnerProfileComponent},
  // Update the archived boats url for app routing module //Done By Alagesan on 20.06.2021	
  { path: 'archived-boats', component: ArchiveBoatComponent},

  { path: 'ownership-transfer', component: OwnershipTransferComponent},
  { path: 'boat-bookings', component: BoatBookingsComponent},
  { path: 'boat-maintenance', component: BoatMaintenanceComponent},
  { path: 'cancellation', component: CancellationComponent },
  { path: 'book-for-owner', component: BookForOwnerComponent},
  { path: 'report-available-boat', component: ReportAvailableBoatComponent },
  { path: 'report-ownership', component: ReportOwnershipComponent },
  { path: 'report-owner', component: ReportOwnerComponent },
  { path: 'report-boat', component: ReportBoatComponent },
  { path: 'report-booking', component: ReportBookingComponent },
  { path: 'booking-details', component: BookingDetailsComponent },
  { path : 'testsooraj',component : TestTestComponent},
  // Create view boat owner url for app routing module //Done By Alagesan on 05.07.2021	
  { path: 'view-boat-owner' , component : ViewBoatOwnerComponent },
    // Create add admin url for app routing module //Done By Alagesan on 29.07.2021	
  { path: 'add-admin' , component: AddAdminComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
