import { Component, effect } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthState } from '../../state/auth-state';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  standalone: true,
})
export class Header {
  constructor(private authState: AuthState){

    effect(()=>{
      const token = authState.token();
      console.log("El token actual es " +  token);
    });

  }
}
