import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit{
  public loading = true;
  public user!: any;
  ngOnInit(): void {
      setTimeout(()=>{
        this.loading = false;
      },2500);
  }
}
