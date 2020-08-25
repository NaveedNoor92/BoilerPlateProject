import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { MenuItem } from '@shared/layout/menu-item';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import {
    PagedListingComponentBase,
    PagedRequestDto
} from 'shared/paged-listing-component-base';

import {
    CMSServiceProxy,
    CMSDto,
    PagedResultDtoOfCMSDto
} from '@shared/service-proxies/service-proxies';
import { Observable } from 'rxjs';

class PagedCMSRequestDto extends PagedRequestDto {
    keyword: string;
    isActive: boolean | null;
}

@Component({
    templateUrl: './sidebar-nav.component.html',
    selector: 'sidebar-nav',
    encapsulation: ViewEncapsulation.None
})

export class SideBarNavComponent extends AppComponentBase {
    keyword = '';
    isActive: boolean | null;
    _CMSPages: CMSDto[] = []
    showComponent: boolean = true;
    routerLocal: Router = null;

    constructor(
        injector: Injector,
        private _cmsService: CMSServiceProxy,
        router: Router

    ) {
        super(injector);
        var request: PagedCMSRequestDto = new PagedCMSRequestDto()
        var hello = this.list(request, 0, Function);
        this.routerLocal = router;

    }

    list(
        request: PagedCMSRequestDto,
        pageNumber: number,
        finishedCallback: Function
    ): void {

        request.keyword = this.keyword;
        request.isActive = this.isActive;
        //console.log(request);
        this._cmsService
            .getAll(request.keyword, request.skipCount, request.maxResultCount)
            .pipe(
                finalize(() => {
                    finishedCallback();
                })
            )
            .subscribe((result: PagedResultDtoOfCMSDto) => {
                this._CMSPages = result.items;
                this.updateMenuItems(result.items);
            });
    }

    refresh() {
        this.showComponent = false;
        setTimeout(x => this.showComponent = true);
    }

    updateMenuItems(childItems): void {
                
        let childNodes: MenuItem[] = [];

        childItems.forEach(page => {
            //childNodes.push(new MenuItem(page.PageName, 'Pages.CMS', 'local_offer', '/app/pagedetails/' + page.id)); 
            childNodes.push(new MenuItem(page.PageName, 'Pages.CMS', 'local_offer', '/app/pagedetails/' + page.id));
        });
        let cmsNode: MenuItem = new MenuItem(this.l('CMS'), 'Pages.CMS', 'menu', '/app/cms/', childNodes);

        this.menuItems.push(cmsNode);


        setTimeout(x => {
            $.AdminBSB.leftSideBar.activate();
            //$.AdminBSB.activateDemo(); 
        });
    }



    menuItems: MenuItem[] = [
        new MenuItem(this.l('HomePage'), '', 'home', '/app/home'),

        new MenuItem(this.l('Tenants'), 'Pages.Tenants', 'business', '/app/tenants'),
        new MenuItem(this.l('Users'), 'Pages.Users', 'people', '/app/users'),
        new MenuItem(this.l('Roles'), 'Pages.Roles', 'local_offer', '/app/roles'),
        new MenuItem(this.l('About'), '', 'info', '/app/about'),

    ];



    showMenuItem(menuItem): boolean {
        //if (menuItem) {
        //    return this.permission.isGranted(menuItem.permissionName);
        //}

        return true;
    }

    click(id): boolean {
        console.log(id);
        this.refresh();
      //  this.routerLocal.navigateByUrl('/app/pagedetails/' );
        this.routerLocal.navigateByUrl('/app/pagedetails/' +id);
        // Router. redirect(URL = '/app/cmsdetails/' + id);
        return true;
    }
    TestBtn() {
        console.log("Testing");
        alert("tfhvh");
    }
}
