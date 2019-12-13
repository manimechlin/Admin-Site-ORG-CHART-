import { BrowserModule } from '@angular/platform-browser';
import {
    MatInputModule, MatPaginatorModule, MatProgressSpinnerModule,
    MatSortModule, MatTableModule
} from "@angular/material";
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from '../services/auth.service';
import { CommonService } from '../services/common.service';
import { UtilityService } from '../shared/utils/utility.service';
import { AppComponent } from './app.component';
import { LayoutComponent } from './Layout/layout.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { GroupsComponent } from './groups/groups.component';
import { OrgChartComponent } from './org-chart/org-chart.component';
import { depchartComponent } from './departments-chart/department-char.component';
import { AppRoutingModule } from './app-routing.module';
import { LayoutModule } from './layout/layout.module';
import { SettingsModule } from './settings/settings.module';
import { MyFilter } from '../shared/pipes/myfilter';
import { GroupsFilter } from '../shared/pipes/groupsfilter';
import { AutofocusDirective } from '../shared/directives/auto-focus.directive';
@NgModule({
    declarations: [
        AppComponent,
        LayoutComponent,
        LoginComponent,
        HomeComponent,
        UsersComponent,
        GroupsComponent,
        OrgChartComponent,
        MyFilter,
        GroupsFilter,
        AutofocusDirective,
        depchartComponent
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
        NgbModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        AppRoutingModule,
        MatInputModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatProgressSpinnerModule,
        LayoutModule,
        SettingsModule

    ],
    exports: [MyFilter, GroupsFilter],
    providers: [
        AuthService,
        AuthGuard,
        CommonService,
        UtilityService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
