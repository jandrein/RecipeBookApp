import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [

  { path: 'feed', loadChildren: () => import ('../feed/feed.module').then( m => m.FeedPageModule) },
  { path: 'uploader',loadChildren: () => import ('../uploader/uploader.module').then( m=> m.UploaderPageModule) },
  { path: 'myrecipes', loadChildren: () => import('../myrecipes/myrecipes.module').then( m => m.MyrecipesPageModule) },
  {
    path: '',
    redirectTo: 'feed',
    pathMatch: 'full'
  }
    ]
  }   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
