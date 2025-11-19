import { Component, signal } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { RolKey } from '../../domain/rol';

@Component({
  selector: 'app-roles-cell',
  imports: [],
  templateUrl: './roles-cell.html',
  styleUrl: './roles-cell.scss'
})
export class RolesCell {

  rolKeys = signal<RolKey[]>([]);

  params!: ICellRendererParams<any, any, any>;

  conversion : Record<RolKey, string> = {
    ROLE_ADMIN: "Administrador",
    ROLE_BIBLIOTECARIO: "Bibliotecario",
    ROLE_CLIENTE: "Cliente",
  }

  conversionColor : Record<RolKey, string> = {
    ROLE_ADMIN: "badge-danger",
    ROLE_BIBLIOTECARIO: "badge-success",
    ROLE_CLIENTE: "badge-primary",
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

  checkParams(){
    this.rolKeys.set(this.params.data.rolKeys);
  }

}
