import { Component, OnInit } from '@angular/core';
import { AthService } from 'src/app/services/ath.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(public authService: AthService) { }

  ngOnInit(): void {
  }

}
