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










}
