import { Component, signal } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

export type GridSingleAction = {
  type: string;
  btnClass: string;
  label: string;
  action: (id: number) => void;
  checkRender: (data: any) => boolean;
};

@Component({
  selector: 'app-grid-actions',
  imports: [],
  templateUrl: './grid-actions.html',
  styleUrl: './grid-actions.scss'
})
export class GridActions implements ICellRendererAngularComp {
  params!: ICellRendererParams<any, any, any>;

  actions = signal<Record<string, GridSingleAction>>({});

  Object = Object;

  checkParams(){
    const acts: Record<string, GridSingleAction> = {};
    // @ts-ignore
    this.params.actions?.map((act: GridSingleAction)=>{
      acts[act.type] = act;
    });
    this.actions.set(acts);
  }

  agInit(params: ICellRendererParams<any, any, any>): void {
    this.params = params;
    console.log("params", this.params);
    this.checkParams();
  }

  refresh(params: ICellRendererParams<any, any, any>): boolean {
    this.params = params;
    this.checkParams();
    return true; 
  }

  doAction(a: string){
    this.actions()[a]?.action?.(this.params.data.id);
  }
}
