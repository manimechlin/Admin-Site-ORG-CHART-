import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../services/Data/Users';
import { CommonService, } from '../../services/common.service';
import { Group,groupinfo } from '../../services/Data/Groups';
import { OrgChartM } from '../../services/Data/OrgChartsData';
import { UtilityService} from '../../shared/utils/utility.service';
import { AddToGroup } from 'src/services/Data/AddToGroup';
 
import { group } from '@angular/animations';
declare const BALKANGraph: any;
declare const OrgChart: any;
declare const $: any;


enum option {
  ADD = 1,
  EDIT = 2,
  DETAIL= 3
}
@Component({
  selector: 'app-depchartComponent',
  styleUrls:['./style.css'],
  templateUrl: './department-chart.component.html'
})
export class depchartComponent implements OnInit{
  public addedGroup:AddToGroup[];
  public orgData: OrgChartM[];
  closeResult: string;
  public users: User[];
  public groups: Group[];
  public groupinfo:groupinfo;
  public selectedUser: any =0;
  public selectedOrgUser: any = 0;
  public selectedgroup: any = 0;
  public activeUser: User;
  public activeOrgUser: OrgChartM;
  public activeDepGroup:AddToGroup;
  public throughGraph: boolean = true;
  public viewDetail: boolean = false;
  public addUToOrg: boolean = false;
  public nodeID: any;
  public group: Group;
  operationOption: any;
  public modelDialog: {
    headerTitle: any,
    buttonTitle: any
}
  
  constructor(private modalService: NgbModal, http: HttpClient, private commonSvc: CommonService, private utilitySvc: UtilityService, @Inject('BASE_URL') baseUrl: string) {
    //http.get<OrgCharts[]>(baseUrl + 'organization').subscribe(result => {
    //    this.orgData = result;
    //    let data = localStorage.getItem('orgChart');
    //    if (data == null || data && JSON.parse(data).length == 0) {
    //        localStorage.setItem('orgChart', JSON.stringify(result));
    //    }

    //}, error => {
    //    console.error(error)
    //});
    this.fetchGroupChart();
}
 
  ngOnInit()
   {
    title: 'Dep-Chart'
    this.users = JSON.parse(localStorage.getItem('users'));
    this.orgData = JSON.parse(localStorage.getItem('orgChart'));
    this.groups = JSON.parse(localStorage.getItem('Groups'));
    this.addedGroup = JSON.parse(localStorage.getItem('addtogrp'));
    this.addedGroup = JSON.parse(localStorage.getItem('addtogrp'));
     this. fetchGroupChart();
   }
   getTitle(id)
    {
    return this.commonSvc.getOptionTitle(id)
   
    }
 
    fetchGroupChart()
    { 
        
      
      let that = this;
      setTimeout(() => {
      var addedgroupdata = JSON.parse(localStorage.getItem('addtogrp'));
      var groups = JSON.parse(localStorage.getItem('Groups'));
      var grp={};
       for(var prop in groups)
        {  var temp= new groupinfo();
           var name=groups[prop].name;
           temp.group=groups[prop][name].group,
           temp.groupName=groups[prop][name].groupName,
           temp.groupState=groups[prop][name].groupState,
           temp.template=groups[prop][name].template;
           grp[groups[prop].name]=temp;
          }
      new OrgChart(document.getElementById("group"), 
         {
            mouseScrool: OrgChart.action.EXPAND,
             template: "olivia",
            enableDragDrop: true,
            dragDropMenu: {
                addInGroup: { text: "Add in group" ,onClick:addAsGroup},
                
        },
          nodeBinding: 
             {
                field_0: "name",
                field_1: "title",
                img_0: "img"   
            },
            tags:grp,
            nodeMenu: {
                details: { text: "Delete", icon: OrgChart.icon.remove(18, 18, '#092863')},
                child : { text: "Add a child group", icon: OrgChart.icon.add(18, 18, '#092863'), onClick:ChildGroup},
            },
            nodes: addedgroupdata
       });      
    }, 200);

    function ChildGroup()
     { 
    //  debugger
    var id=document.getElementById('groupTempl');
 
    // debugger
    //     let group={};
    //     let headerTitle = "ADD " + that.getTitle(1);
    //   let buttonTitle = "Save"
    //   that.modelDialog = { headerTitle, buttonTitle };
    //    group = new Group();

    //    that.modalService.open(content, { centered: true }).result.then((result) => {
    //     that.closeResult = result;
    //  }, (reason) => {
    //     that.closeResult = that.getDismissReason(reason);
    //  });
    }
    function Deletegroups(nodeID) 
    {
        var data =JSON.parse(localStorage.getItem('addtogrp'));
        var tagvalue;
      if(nodeID<999)
        { 
           
            that.commonSvc.deleteGroup(nodeID).subscribe((isDeleted) => 
             { debugger
                if (isDeleted) {
                   // that.getGroups();
                    that.utilitySvc.showNotification('success', 'Congratulation! Deleted Successfully');
                } else
                 {
                    that.utilitySvc.showNotification('danger', `This ${this.getTitle(1)} name is already in use!`);
                }
            })
       
           var tag
            var len=data.length; 
          for(var i=0;i<len;i++)
          {
            if(data[i].id==nodeID)
            {
              tagvalue =data[i].tags;    
            } 
           }
      
        for(var i=0;i<len;i++)
          {  
            
            if(tagvalue==data[i].tags)
            {
                console.log(data);
                console.log(data[i].id)
                data.splice(i,i+1); 
          localStorage.setItem('addtogrp', JSON.stringify(data));
            } 
          }
          
          for(var i=0;i<len;i++)
          {
          if(data[i].id==nodeID)
          {
             data.splice(i,1); 
             localStorage.setItem('addtogrp', JSON.stringify(data));  
          } 
           }
         }
        else
        {
            for(var i=0;i<data.length;i++)
            {
                debugger
                if(data[i].id==nodeID)
                {
                   data.splice(i,i+1); 
                localStorage.setItem('addtogrp', JSON.stringify(data));  
                window.location.reload();
                } 
            }
        }
      
    }
       function addAsGroup(nodeID,gropuid)
       {
        var data =JSON.parse(localStorage.getItem('addtogrp'))
        for(var i=0;i<data.length;i++)
        {
         if(data[i].tags==nodeID)
         {
          if(data[i].id>999)
           { debugger
             data[i].tags=[gropuid];
             localStorage.setItem('addtogrp', JSON.stringify(data));
             window.location.reload();
           }
         }
        }
      }
       
}

addGroup() {
  debugger
  this.commonSvc.addGroup(this.group).subscribe((isAdded) => {
      if (isAdded) {
          //this.getGroups();
          this.modalService.dismissAll();
          this.utilitySvc.showNotification('success', 'Record added successfully!!');
        
      }
  })
}


open(content, type, modalDimension, groupOption, group) 
{
 
  this.operationOption = groupOption;
  if (option.ADD == groupOption) {
    debugger
      let headerTitle = "ADD " + this.getTitle(1);
      let buttonTitle = "Save"
      this.modelDialog = { headerTitle, buttonTitle };
      this.group = new Group();
    
  }
  if (option.EDIT == groupOption) {
      let headerTitle = "EDIT " + this.getTitle(1);
      let buttonTitle = "Save changes"
      this.modelDialog = { headerTitle, buttonTitle };
      this.group = group;
  }
  if (option.DETAIL == groupOption) {
      let headerTitle = this.getTitle(1)+" DETAIL";
      let buttonTitle = ""
      this.modelDialog = { headerTitle, buttonTitle };
      this.group = group;
  }

  if (modalDimension === 'sm' && type === 'modal_mini') {
      this.modalService.open(content, { windowClass: 'modal-mini', size: 'sm', centered: true }).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
  } else if (modalDimension === '' && type === 'Notification') 
  {
      this.modalService.open(content, { windowClass: 'modal-danger', centered: true }).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
          this.closeResult = this.getDismissReason(reason);
      });
  } else 
  {
      debugger
      this.modalService.open(content, { centered: true }).result.then((result) => {
          this.closeResult = result;
      }, (reason) => {
          this.closeResult = this.getDismissReason(reason);
      });
  }
}
private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
  } else {
      return reason;
  }
}
}



  