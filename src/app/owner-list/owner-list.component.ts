import { Component, OnInit } from '@angular/core';
import { OwnersService } from '../shared/owner/owner.service';

@Component({
  selector: 'app-owner-list',
  templateUrl: './owner-list.component.html',
  styleUrls: ['./owner-list.component.css'],
})
export class OwnerListComponent implements OnInit {
  owners: Array<any>;

  constructor(private ownerService: OwnersService) {}

  ngOnInit() {
    this.ownerService.getAll().subscribe((data) => {
      this.owners = data._embedded.owners.filter((owner) => {
        const dni = parseInt(owner.dni, 10);
        if (isNaN(dni)) {
          return false;
        }
        return true;
      });
    });
  }
}
