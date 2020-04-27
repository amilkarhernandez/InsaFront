import { Component, OnInit } from '@angular/core';
import { AthService } from 'src/app/services/ath.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AthService, private router: Router) { }

  ngOnInit(): void {
  }

  logout(): void{
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
