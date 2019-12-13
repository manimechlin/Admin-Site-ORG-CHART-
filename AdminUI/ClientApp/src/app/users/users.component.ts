import { Component, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '../../services/common.service';
import { UtilityService } from '../../shared/utils/utility.service';
import { User } from '../../services/Data/Users';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
enum option {
    ADD = 1,
    EDIT = 2,
    DETAIL= 3
}
@Component({
    selector: 'app-users-component',
    templateUrl: './users.component.html',
    styleUrls: ['./style.css']
})
export class UsersComponent {
    private modalRef: NgbModalRef;
    public model: User[];
    closeResult: string;
    public user: User;
    public modelDialog: {
        headerTitle: any,
        buttonTitle: any
    }
    public operationOption: any;


    displayedColumns: string[] = ['id', 'name', 'email', 'phone','action'];
    dataSource: MatTableDataSource<User>;

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;
   
    constructor(private modalService: NgbModal, private commonSvc: CommonService, private utilitySvc: UtilityService) {
        this.getUsers();
    }
    ngOnInit() {
        this.getUsers();
    }
    getTitle(id) {
        return this.commonSvc.getOptionTitle(id)
    }
    getUsers() {
        this.commonSvc.getUsers().subscribe((res) => {
            this.model = res;
            console.log(this.model);
            this.dataSource = new MatTableDataSource(res);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
      
    }
    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
      }
    
    deleteUser(id: any) {
        this.commonSvc.deleteUser(id).subscribe((res) => {
            if (res == 'Success') {
                this.getUsers();
                this.utilitySvc.showNotification('success', 'User removed successfully!');
                this.modalService.dismissAll();
            }
            else {
                this.getUsers();
                this.utilitySvc.showNotification('danger', res);
                this.modalService.dismissAll();
            }
        })
    }
    open(content, type, modalDimension, userOption, user) {
        this.operationOption = userOption;
        if (option.EDIT == userOption) { 
            let headerTitle = "EDIT "+ this.getTitle(2);
            let buttonTitle ="Save changes"
            this.modelDialog = { headerTitle, buttonTitle };
            this.user = user;
        }
        if (option.ADD == userOption) {
            let headerTitle = "ADD " + this.getTitle(2);
            let buttonTitle = "Save"
            this.modelDialog = { headerTitle, buttonTitle };
            this.user = new User();
        }
        if (option.DETAIL == userOption) {
            let headerTitle = this.getTitle(2)+" DETAIL";
            let buttonTitle = ""
            this.modelDialog = { headerTitle, buttonTitle };
            this.user = user;
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
    updateUser() {
        this.commonSvc.updateUser(this.user).subscribe((res) => {
            if (res == 'Success') {
                this.getUsers();
                this.utilitySvc.showNotification('success', 'Record updated successfully!');
                this.modalService.dismissAll();
            }
            else {
                this.getUsers();
                this.utilitySvc.showNotification('danger', res);
                this.modalService.dismissAll();
            }
        })
    }

    addUser() {
        this.commonSvc.addUser(this.user).subscribe((res) => {
            if (res == 'Success') {
                this.getUsers();
                this.modalService.dismissAll();
                this.utilitySvc.showNotification('success', 'Record added successfully!');
            }
            else {
                this.getUsers();
                this.utilitySvc.showNotification('danger', res);
                this.modalService.dismissAll();
            }
        })
    }
    showDetail() {
        alert('ok');
    }
}
