import { Component } from '@angular/core';

@Component({
  selector: 'app-alta-admin',
  templateUrl: './alta-admin.component.html',
  styleUrls: ['./alta-admin.component.scss']
})
export class AltaAdminComponent {
  public loading = false;
  ngOnInit(): void {
    setTimeout(()=>{
      this.loading = false;

  },2500);
}
}
