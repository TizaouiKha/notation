import {Component, NgModule, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {NavbarComponent} from "./components/navbar/navbar.component";
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports:  [RouterOutlet, NavbarComponent, MatTabsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'notation';

  constructor(private http: HttpClient) {
  }
  ngOnInit(){
  //   console.log(environment);
  //   this.http.get(environment.apiUrl +"/student/all").subscribe({
  //     next: res=>
  //       console.log(res)
  //   })
  }
}
