import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/views/home/home.component';
import { MenuComponent } from './components/templates/menu/menu.component';


import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table'
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './components/templates/dialog/dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { MatSortModule } from '@angular/material/sort';
import { ReactiveFormsModule } from '@angular/forms';
import { FollowupComponent } from './components/views/followup/followup.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingComponent } from './components/templates/loading/loading.component';
import { CanalRetornoComponent } from "./components/views/canal-retorno/canal-retorno.component";
import { CanalRetornoFormComponent } from './components/views/canal-retorno-form/canal-retorno-form.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EditCanalRetornoComponent } from './components/views/edit-canal-retorno/edit-canal-retorno.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    DialogComponent,
    FollowupComponent,
    LoadingComponent,
    CanalRetornoComponent, CanalRetornoFormComponent, EditCanalRetornoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    HttpClientModule,
    MatSortModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
