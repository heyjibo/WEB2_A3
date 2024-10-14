import { Routes,RouterModule } from '@angular/router';
import { MyNewPageComponent } from './my-new-page/my-new-page.component';
import { AddadminComponent } from './addadmin/addadmin.component';
import { AdminComponent } from './admin/admin.component';
import { FundraiserComponent } from './fundraiser/fundraiser.component';
import { MainComponent } from './main/main.component';
import { OwnationComponent } from './ownation/ownation.component';
import { SearchComponent } from './search/search.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    { path: 'my-new-page', component: MyNewPageComponent },
    { path: 'addadmin', component: AddadminComponent },
    { path: 'admin', component: AdminComponent },
    { path: 'fundraiser', component: FundraiserComponent },
    { path: 'ownation', component: OwnationComponent },
    { path: 'search', component: SearchComponent },
    { path: 'main', component: MainComponent },
    { path: 'fundraiser/:id', component: FundraiserComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
