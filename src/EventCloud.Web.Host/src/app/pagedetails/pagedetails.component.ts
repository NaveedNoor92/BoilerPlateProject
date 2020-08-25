import { Component, Injector, Optional, Inject, OnInit } from '@angular/core';

import {
    MAT_DIALOG_DATA,
    MatDialogRef,
    MatCheckboxChange
} from '@angular/material';
import { finalize } from 'rxjs/operators';
import * as _ from 'lodash';
import { Routes, Router, RouterModule, ActivatedRoute } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import {
    CMSServiceProxy,
    CMSDto
} from '@shared/service-proxies/service-proxies';



@Component({
    selector: 'app-pagedetails',
    templateUrl: './pagedetails.component.html',
    styleUrls: ['./pagedetails.component.css']
})
//export class PagedetailsComponent implements OnInit {

//  constructor() { }

//  ngOnInit() {
//  }

//}

export class PagedetailsComponent extends AppComponentBase
    implements OnInit {
    routerLocal: ActivatedRoute = null;
    pageData: CMSDto = new CMSDto();
    _cmsService: CMSServiceProxy = null;
    id;
    inedit: boolean | false;
    htmlContent: string = null;
    pageName: string = null;
    showComponent: boolean = true;

    constructor(injector: Injector, public router: ActivatedRoute, public proxy: CMSServiceProxy) {
        super(injector);
        this.routerLocal = router;
        this._cmsService = proxy;
        this.inedit = false;
    }
    ngOnInit() {
        this.getPageData();

    }

    getPageData(): void {
        this.id = this.routerLocal.snapshot.paramMap.get("id");
        console.log("ID vALUE");
        console.log(this.id);

        this._cmsService.get(this.id).subscribe(result => {
            this.pageData = result  ;
            console.log("Result");
            console.log(result);

            this.htmlContent = this.pageData.Data;
            this.pageName = this.pageData.PageName;
            console.log("This test   123");
            console.log(this.htmlContent);
            console.log(this.pageName);
        });
        console.log("This test");
        console.log(this.htmlContent);
        console.log(this.pageName);
        this.inedit = false;
    }

    editPage(id: number): void {
        this.inedit = true;
        //this.htmlcontent = this.pageData.data;
        console.log(this.htmlContent);


    }

    onCancelClick() {
        this.inedit = false;

    }

    close(result: any): void {
        this.inedit = false;
    }

    refresh() {
        this.showComponent = false;
        setTimeout(x => this.showComponent = true);
    }

    onSaveClick(Id): boolean {
        //this.inedit = !this.inedit;
        let updatedData: CMSDto = new CMSDto();
        updatedData.PageName = this.pageName;
        updatedData.Data = this.htmlContent;
        updatedData.id = this.id;
        console.log(updatedData);
        this._cmsService.update(updatedData).pipe(
            finalize(() => {
                this.inedit = false;
            })
        )
            .subscribe(() => {
                this.notify.info(this.l('SavedSuccessfully'));
            });
        this.refresh();
        return true;
    }


}

