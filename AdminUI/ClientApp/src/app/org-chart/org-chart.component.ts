import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../services/Data/Users';
import { CommonService } from '../../services/common.service';
import { Group } from '../../services/Data/Groups';
import { OrgChartM } from '../../services/Data/OrgChartsData';
import { UtilityService } from '../../shared/utils/utility.service';
 
declare const OrgChart: any;
declare const BALKANGraph: any;
declare const $: any;

@Component({
    selector: 'app-org-chart-component',
    styleUrls:['./style.css'],
    templateUrl: './org-chart.component.html'
})

export class OrgChartComponent implements OnInit{
    public orgData: OrgChartM[];
    closeResult: string;
    public users: User[];
    public groups: Group[];
    public selectedUser: number =0;
    public selectedOrgUser: any = 0;
    public selectedgroup: any = 0;
    public activeUser: User;
    public activeOrgUser: OrgChartM;
    public throughGraph: boolean = true;
    public viewDetail: boolean = false;
    public addUToOrg: boolean = false;
    public nodeID: any;
    constructor(private modalService: NgbModal, http: HttpClient, private utilitySvc: UtilityService, private commonSvc: CommonService, @Inject('BASE_URL') baseUrl: string) {
        //http.get<OrgCharts[]>(baseUrl + 'organization').subscribe(result => {
        //    this.orgData = result;
        //    let data = localStorage.getItem('orgChart');
        //    if (data == null || data && JSON.parse(data).length == 0) {
        //        localStorage.setItem('orgChart', JSON.stringify(result));
        //    }

        //}, error => {
        //    console.error(error)
        //});
    }
   
    ngOnInit() {
        this.users = JSON.parse(localStorage.getItem('users'));
        this.orgData = JSON.parse(localStorage.getItem('orgChart'));
        this.groups = JSON.parse(localStorage.getItem('Groups'));
       
        this.fetchOrganization();
      //  

    }
    getTitle(id) {
        return this.commonSvc.getOptionTitle(id)
    }
  

   
    fetchOrganization()
     {
        let that = this;
        setTimeout(() => {
            var orgChartData = JSON.parse(localStorage.getItem('orgChart'));
            
            for(var i = 0; i < orgChartData.length; i++)
             {
                orgChartData[i].field_number_children = childCount(orgChartData[i].id) + "/" + orgChartData.length;
             }

            function childCount(id) {
                let count = 0;
                for (var i = 0; i < orgChartData.length; i++) {
                    if (orgChartData[i].pid == id) {
                        count++;
                        count += childCount(orgChartData[i].id);
                    }
                }
                return count;
            }

            OrgChart.templates.ula.field_number_children = '<text fill="#3c4858" x="25" y="115" text-anchor="middle">{val}</text>';
      
            new OrgChart(document.getElementById("tree"), {
                template: "ula",
                layout: BALKANGraph.tree,
                align: BALKANGraph.ORIENTATION,
                nodeMenu: {
                    details: { text: "Details", icon: OrgChart.icon.details(18, 18, '#092863'), onClick: callDetailHandler},
                    addT: { text: "Add new", icon: OrgChart.icon.add(18, 18, '#092863'), onClick: callAddHandler },
                    removeT: { text: "Remove", icon: OrgChart.icon.remove(18, 18, '#092863'), onClick: callRemoveHandler },
                    AddG: { text: "Add To Group", icon: OrgChart.icon.add(18, 18, '#092863'), onClick: callAddGroupHandler }
                },
                nodeBinding: {
                    field_0: "name",
                    field_1: "title",
                    img_0: "img",
                    field_number_children: "field_number_children"
                },
                nodes: orgChartData
           });      
        }, 200);
        

      

        function callDetailHandler(nodeId)
         {
            that.nodeID = nodeId;
            that.throughGraph = false;
            that.addUToOrg = false;
            that.viewDetail = true;
            that.commonSvc.getOrgChart(nodeId).subscribe((res) => {
                that.activeOrgUser = res;
                $('#addToOrg').click();
            })
          
        }
        function callAddGroupHandler(nodeId) 
        {
            that.nodeID = nodeId;
            that.throughGraph = false;
            that.addUToOrg = true;
            that.viewDetail = false;
           
        that.commonSvc.getOrgChart(nodeId).subscribe((res) => {
                that.activeOrgUser = res;
                $('#addToGroup').click();
            })


        }
        function callAddHandler(nodeId) 
        {
            that.nodeID = nodeId;
            that.throughGraph = false;
            that.addUToOrg = true;
            that.viewDetail = false;
            $('#addToOrg').click();
        }
        

        function callRemoveHandler(nodeId) 
        {
            that.nodeID = nodeId;
            that.throughGraph = false;
            that.commonSvc.removeFromOrganization(nodeId).subscribe((isRemoved) => {
                if (isRemoved) {
                    that.fetchOrganization();
                    that.utilitySvc.showNotification('success', 'Record removed from organization successfully!');
                }
            });
        }
    }
    
    addToOrganization()
     {
        if (!this.throughGraph && this.nodeID)
        {
            this.selectedOrgUser = this.nodeID;
        }
        this.commonSvc.addToOrganization(this.selectedUser, this.selectedOrgUser, this.selectedgroup).subscribe((isAdded) => {
            if (isAdded)
             {
                this.fetchOrganization();
                this.modalService.dismissAll();
                this.utilitySvc.showNotification('success', 'Record added to organization successfully!');
            }
        })
    }
    addToGroup()
    {
       
        if (!this.throughGraph && this.nodeID)
        {
            this.selectedUser = this.nodeID;
        }
       
        this.commonSvc.addToGroup(this.selectedUser, this.selectedgroup).subscribe((isAdded) => {
            
            if (isAdded)
             {
                this.fetchOrganization();
                this.modalService.dismissAll();
                this.utilitySvc.showNotification('success', 'Added to Group successfully!');
             }
             else
             {
                this.utilitySvc.showNotification('danger', 'Already added');
             }
        })
    }

    onSelectOrg() {
        this.commonSvc.getOrgChart(this.selectedOrgUser).subscribe((res) => {
            this.activeOrgUser = res;
            console.log(res);
        }) 
    }
    onselectUser() {
        this.commonSvc.getUser(this.selectedUser).subscribe((res) => {
            this.activeUser = res;
            console.log(this.activeUser)
        })
    }
    open(content, type, modalDimension, option) {
        if (option == 1) {
            this.throughGraph = true;
            this.addUToOrg = false;
        } else {
            this.throughGraph = false;
        }
        if (this.throughGraph || this.addUToOrg) {
            this.selectedUser = 0;
            this.selectedOrgUser = 0;
            this.selectedgroup = 0;
            this.activeOrgUser = new OrgChartM();
            this.activeUser = new User();
        }
        this.commonSvc.getUsersForOrganization().subscribe((res) => {
            this.users = res;
        });
        this.orgData = JSON.parse(localStorage.getItem('orgChart'));
        this.groups = JSON.parse(localStorage.getItem('Groups'));
        if (modalDimension === 'sm' && type === 'modal_mini') {
            this.modalService.open(content, { windowClass: 'modal-mini', size: 'sm', centered: true }).result.then((result) => {
                this.closeResult = `Closed with: ${result}`;
            }, (reason) => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            });
        } else if (modalDimension === '' && type === 'Notification') {
            this.modalService.open(content, { windowClass: 'modal-danger', centered: true }).result.then((result) => {
                this.closeResult = `Closed with: ${result}`;
            }, (reason) => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            });
        } else {
            this.modalService.open(content, { centered: true }).result.then((result) => {
                this.closeResult = `Closed with: ${result}`;
            }, (reason) => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            });
        }
    }
    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

}
