import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManagePostPage } from './manage-post';

@NgModule({
  declarations: [
    ManagePostPage,
  ],
  imports: [
    IonicPageModule.forChild(ManagePostPage),
  ],
})
export class ManagePostPageModule {}
