import { Component, signal } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-grid-actions',
  imports: [],
  templateUrl: './grid-actions.html',
  styleUrl: './grid-actions.scss'
})
export class GridActions implements ICellRendererAngularComp {
  params!: ICellRendererParams<any, any, any>;

  hasEdit = signal(false);
  hasDelete = signal(false);

  agInit(params: ICellRendererParams<any, any, any>): void {
    this.params = params;
    console.log("params", this.params);

    // @ts-ignore
    this.hasEdit.set(!!this.params.editAction);
    // @ts-ignore
    this.hasDelete.set(!!this.params.deleteAction);
  }

  refresh(params: ICellRendererParams<any, any, any>): boolean {
    this.params = params;

    this.hasEdit.set(!!this.params.value.editAction);
    this.hasDelete.set(!!this.params.value.deleteAction);
    return true; 
  }

  edit(){
    this.params.value?.editAction?.(this.params.data.id);
  }

  remove(){
    this.params.value?.deleteAction?.(this.params.data.id);
  }

}
