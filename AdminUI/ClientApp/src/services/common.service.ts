import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as _ from 'lodash';
import 'rxjs/add/operator/map'
import 'rxjs/add/observable/of';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Users, User } from './Data/Users';
import { Groups, Group , groupinfo } from './Data/Groups';
import { OrgChartM, OrgCharts } from './Data/OrgChartsData';
import { Option, Options } from './Data/Options';
import { AddToGroup, AddToGroups } from './Data/AddToGroup';
import { UtilityService } from '../shared/utils/utility.service';

@Injectable()
export class CommonService {
    constructor(private router: Router, private http: HttpClient,private utilitySvc: UtilityService) {

  }

    initializeData(): Observable<string>  {
        localStorage.setItem('options', JSON.stringify(Options))
        localStorage.setItem('users', JSON.stringify(Users));
        localStorage.setItem('Groups', JSON.stringify(Groups));
        localStorage.setItem('orgChart', JSON.stringify(OrgCharts));
        localStorage.setItem('addtogrp', JSON.stringify(AddToGroups));
       
        
        return Observable.of("Data Initialized");
    }

    //Options
    getOptions(): Observable<Option[]> 
    {
        let data = JSON.parse(localStorage.getItem('options'));
        return Observable.of(data);
    }

    getOption(id): Observable<Option> {
        let data = JSON.parse(localStorage.getItem('options'));
        var result;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == id) {
                result = data[i];
                break;
            }
        }
        return Observable.of(result);
    }

    updateOptions(option): Observable<boolean> 
    {
        let data = JSON.parse(localStorage.getItem('options'));
        for (let i = 0; i < data.length; i++) 
        {
            if (data[i].id == option.id) {
                data[i] = option;
                break;
            }
        }
        localStorage.setItem('options', JSON.stringify(data));
        return Observable.of(true);
    }


    getOptionTitle(id): string 
    {
        let data = JSON.parse(localStorage.getItem('options'));
        var result;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == id) {
                result = data[i].name;
                break;
            }
        }
        return result;
    }

    getUsers(){
         return this.http.get('/api/Users/getUsers').map((res) => {
             return <User[]>(res);
         });
    }

    getUser(id): Observable<User> {
        let data = JSON.parse(localStorage.getItem('users'));
        var result;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == id) {
                result = data[i];
                break;
            }
        }
        return Observable.of(result);
    }

    addUser(user) {
        let headers = new HttpHeaders({
            "Content-Type": "application/json",
            "Accept": "application/json"
        });
        return this.http.post("/api/Users/addUser", { Name: user.name, Email: user.email, PhoneNumber: user.phone }, { headers });
    }

    deleteUser(id) {
        let headers = new HttpHeaders({
            "Content-Type": "application/json",
            "Accept": "application/json"
        });
        return this.http.post("/api/Users/deleteUser", { UserId: id }, { headers });
    }

    updateUser(user){
        let headers = new HttpHeaders({
            "Content-Type": "application/json",
            "Accept": "application/json"
        });
        return this.http.post("/api/Users/updateUser", { UserId: user.id, Name: user.name, Email: user.email, PhoneNumber: user.phone }, { headers });
    }

    getGroups(): Observable<Group[]> {
        return this.http.get('/api/Groups/getGroups').map((res) => {
            return <Group[]>(res);
        });
    }

    getGroup(id): Observable<Group> {
        let data = JSON.parse(localStorage.getItem('Groups'));
        var result;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == id) {
                result = data[i];
                break;
            }
        }
        return Observable.of(result);
    }

    deleteGroup(id) {
        let headers = new HttpHeaders({
            "Content-Type": "application/json",
            "Accept": "application/json"
        });
        return this.http.post("/api/Groups/deleteGroup", { GroupId: id }, { headers });
    }

    addGroup(group) {
        let headers = new HttpHeaders({
            "Content-Type": "application/json",
            "Accept": "application/json"
        });
        return this.http.post("/api/Groups/addGroup", { GroupId: group.id, Name: group.name, IsActive: group.isActive }, { headers });

    }
    updateGroup(group) {
        let headers = new HttpHeaders({
            "Content-Type": "application/json",
            "Accept": "application/json"
        });
        return this.http.post("/api/Groups/updateGroup", { GroupId: group.id, Name: group.name, IsActive: group.isActive }, { headers });
    }

    getOrgChart(id): Observable<OrgChartM> {
        let data = JSON.parse(localStorage.getItem('orgChart'));
        var result;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == id) {
                result = data[i];
                break;
            }
        }
        return Observable.of(result);
    }
    
    addToGroup(UserID,groupId): Observable<boolean> 
    {var userid:number=+UserID;
        userid=userid+1000;
     
     try
     {
        debugger
        let user = JSON.parse(localStorage.getItem('users'));
        let group = JSON.parse(localStorage.getItem('Groups'));
        var filteredUser;
        var filteredGroup;
        
        for (let i = 0; i < user.length; i++) 
        {
            // if (user[i].id == UserID) 
            // {
            //     filteredUser = user[i];
            //     break;
            // }
            if (user[i].id == userid) 
            {
                filteredUser = user[i];
                break;
            }
        }
        for (let i = 0; i < group.length; i++)
         {
            if (group[i].id == groupId) 
            {
                filteredGroup = group[i];
                break;
            }
        }
         
        let data = JSON.parse(localStorage.getItem('addtogrp'));
        let allIds = [];
        for (let i = 0; i < data.length; i++) 
        {
            allIds.push(data[i].id);
        }
      
       // ---------------user tittle is not given in user array so i jsut pass null it , if you changes in future user array than pass here tittle values 
     
       var d={id:filteredUser.id,pid:filteredGroup.id,tags:[filteredGroup.name],name:filteredUser.name,title:" ",img:filteredUser.img};
      var dataname,dataid;
    
      for (let i = 0; i < data.length; i++) 
       {  
       
        // if (data[i].id == UserID) 
        // {
          
        //     dataid=data[i].id; 
        //     dataname=data[i].tags;
        // }
        if (data[i].id == userid) 
        {
          
            dataid=data[i].id; 
            dataname=data[i].tags;
        }
      } 
     
    
       
    if(filteredGroup.isActive==true)
    {
      
            if(dataid==filteredUser.id  && dataname==filteredGroup.name)
            {
                return Observable.of(false);
            }
            else
            {
                data.push(d);
                localStorage.setItem('addtogrp', JSON.stringify(data));
                return Observable.of(true);
            }  
    }
    else
    {
        this.utilitySvc.showNotification('danger', 'Group is Inactive');
    }
     }
      catch(error)
     {
        return Observable.of(false);
     }
    }
    addToOrganization(userId, orgId, groupId): Observable<boolean> {
        try {
            let user = JSON.parse(localStorage.getItem('users'));
            let group = JSON.parse(localStorage.getItem('Groups'));
            var filteredUser;
            var filteredGroup;
            for (let i = 0; i < user.length; i++) {
                if (user[i].id == userId) {
                    filteredUser = user[i];
                    break;
                }
            }
            for (let i = 0; i < group.length; i++) {
                if (group[i].id == groupId) {
                    filteredGroup = group[i];
                    break;
                }
            }
            let data = JSON.parse(localStorage.getItem('orgChart'));
            let allIds = [];
            for (let i = 0; i < data.length; i++) 
            {
                allIds.push(data[i].id);
            }
            let maxIDNumber = Math.max(...allIds);
            var d = { date: "", id: filteredUser.id, name: filteredUser.name, pid: parseInt(orgId), img: filteredUser.img, title: filteredGroup ? filteredGroup.name : '' };
            data.push(d);
            localStorage.setItem('orgChart', JSON.stringify(data));
            return Observable.of(true);
        } catch (ex) 
        {
            return Observable.of(false);
        } 
    }


    removeFromOrganization(id): Observable<boolean> {
        let data = JSON.parse(localStorage.getItem('orgChart'));
        let newData = data.filter((item) => {
            return item.id != id;
        })
        localStorage.setItem('orgChart', JSON.stringify(newData));
        return Observable.of(true);
    }
    getUsersForOrganization(): Observable<User[]> {
        let users = JSON.parse(localStorage.getItem('users'));
        let data = JSON.parse(localStorage.getItem('orgChart'));
        let allUsersIds = _.map(users, 'id');
        let allOrgIds = _.map(data, 'id');
        let ids = allUsersIds.filter(e => !allOrgIds.includes(e));
        let result = users.filter(e => ids.includes(e.id));
       
        return Observable.of(result);
    }

    getOrganizationLevel(): Observable<number> {
        let data = JSON.parse(localStorage.getItem('orgChart'));
        let allIds = _.map(data, 'pid');
        let uniqIds = Array.from(new Set(allIds));
        return Observable.of(uniqIds.length);
    }
}
