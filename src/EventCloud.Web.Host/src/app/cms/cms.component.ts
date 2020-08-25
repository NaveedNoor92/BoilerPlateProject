import { Component, Injector, AfterViewInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
    PagedListingComponentBase,
    PagedRequestDto
} from '@shared/paged-listing-component-base';
import {
    CMSServiceProxy,
    CMSDto,
    PagedResultDtoOfCMSDto
} from '@shared/service-proxies/service-proxies';
import { finalize } from 'rxjs/operators';

class PagedCMSRequestDto extends PagedRequestDto {
    keyword: string;
}


@Component({
    templateUrl: './cms.component.html',
    animations: [appModuleAnimation()]
})
export class CMSComponent extends PagedListingComponentBase<CMSDto> {
    protected delete(entity: CMSDto): void {
        throw new Error("Method not implemented.");
    }

    cmspages: CMSDto[] = [];

    keyword = '';
  

    constructor(
        injector: Injector,
        private _cmsService: CMSServiceProxy
    ) {
        super(injector);
    }

    list(
        request: PagedCMSRequestDto, 
        pageNumber: number,
        finishedCallback: Function
    ): void {

        request.keyword = this.keyword;
        console.log("Test");

        this._cmsService
            .getAll(request.keyword, request.skipCount, request.maxResultCount)
            .pipe(
                finalize(() => {
                    finishedCallback();
                })
            )
            .subscribe((result: PagedResultDtoOfCMSDto) => {
                this.cmspages = result.items;
               // this.showPaging(result, pageNumber);
            });
    }


    //createCMS(): void {
    //    this.showCreateOrEditRoleDialog();
    //}

    //editCMS(role: CMSDto): void {
    //    this.showCreateOrEditRoleDialog(role.id);
    //}

    //showCreateOrEditRoleDialog(id?: number): void {
    //    let createOrEditRoleDialog;
    //    if (id === undefined || id <= 0) {
    //        createOrEditRoleDialog = this._dialog.open(CreateCMSDialogComponent);
    //    } else {
    //        createOrEditRoleDialog = this._dialog.open(EditCMSDialogComponent, {
    //            data: id
    //        });
    //    }

    //    createOrEditRoleDialog.afterClosed().subscribe(result => {
    //        if (result) {
    //            this.refresh();
    //        }
    //    });
    //}








}
