import { Component, OnInit } from '@angular/core';
import { BaseLayoutComponent } from '../BaseLayoutComponent';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonService } from '../../../services/common.service';
declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
 

// let data = JSON.parse(localStorage.getItem('options'));
// var result;
// result = data[0].name; 
export let ROUTES: RouteInfo[] = [
    { path: '', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/org-chart', title: 'Chart', icon: 'bubble_chart', class: '' },
    { path: '/dep-chart', title:" chart", icon: 'bubble_chart', class: '' },
    { path: '/users', title: 'Users', icon: 'supervisor_account', class: '' },
    { path: '/groups', title: 'Groups', icon: 'group_work', class: '' },
    { path: '/settings', title: 'Settings', icon: '', class: '' },
    { path: '/settings/options-configuration', title: 'Settings/options-configuration', icon: '', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent extends BaseLayoutComponent implements OnInit {
    menuItems: any[];
     
    constructor(authSvc: AuthService, private commonSvc: CommonService) 
    {
        super(authSvc);
        
    }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }

   
     getTitle(id) 
     {
        let varia =  this.commonSvc.getOptionTitle(id)
        ROUTES[2].title = varia +" Chart";
         ROUTES[4].title = varia;
        return varia

    }
    



    
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
