import { Component, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { CommonService } from '../../services/common.service';
import { UtilityService } from '../../shared/utils/utility.service';
import { Group } from '../../services/Data/Groups';
enum option {
    ADD = 1,
    EDIT = 2,
    DETAIL= 3
}
@Component({
    selector: 'app-groups-component',
    templateUrl: './groups.component.html',
    styleUrls: ['./style.css']
})
export class GroupsComponent {
    public model: Group[];
    public group: Group;
    closeResult: string;
    operationOption: any;
    public modelDialog: {
        headerTitle: any,
        buttonTitle: any
    }
    public searchText: any = "";
    displayedColumns: string[] = ['id', 'active', 'name', 'group icon','action'];
    dataSource: MatTableDataSource<Group>;

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;
    constructor(private modalService: NgbModal, private commonSvc: CommonService, private utilitySvc: UtilityService) {
        this.getGroups();
    }
    ngOnInit() {

        this.getGroups();
    }
    getTitle(id) {
        return this.commonSvc.getOptionTitle(id)
    }
    getGroups() 
    {

        this.commonSvc.getGroups().subscribe((res) => 
        {
            this.model = res;
            this.dataSource = new MatTableDataSource(res);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        })
    }
    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
    }

    deleteGroup(id: any) {
        this.commonSvc.deleteGroup(id).subscribe((res) => {
            if (res == 'Success') {
                this.getGroups();
                this.utilitySvc.showNotification('success', 'Congratulation! Deleted Successfully');
            }
            else {
                this.getGroups();
                this.utilitySvc.showNotification('danger', res);
                this.modalService.dismissAll();
            }
        });
    }

    updateGroup() {
        this.commonSvc.updateGroup(this.group).subscribe((res) => {
            if (res == 'Success') {
                this.getGroups();
                this.utilitySvc.showNotification('success', 'Record updated successfully!');
                this.modalService.dismissAll();
            }
            else {
                this.getGroups();
                this.utilitySvc.showNotification('danger', res);
                this.modalService.dismissAll();
            }
        });
    }

    addGroup() {
        this.commonSvc.addGroup(this.group).subscribe((res) => {
            if (res == 'Success') {
                this.getGroups();
                this.utilitySvc.showNotification('success', 'Record added successfully!');
                this.modalService.dismissAll();
            }
            else {
                this.getGroups();
                this.utilitySvc.showNotification('danger', res);
                this.modalService.dismissAll();
            }
        });
    }
    open(content, type, modalDimension, groupOption, group) {
        this.operationOption = groupOption;
        if (option.ADD == groupOption) {
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
        } else if (modalDimension === '' && type === 'Notification') {
            this.modalService.open(content, { windowClass: 'modal-danger', centered: true }).result.then((result) => {
                this.closeResult = `Closed with: ${result}`;
            }, (reason) => {
                this.closeResult = this.getDismissReason(reason);
            });
        } else {
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
