import { Component, OnInit, Input } from '@angular/core';
import { OwnersService } from '../shared/owner/owner.service';

@Component({
  selector: 'app-car-card',
  templateUrl: './car-card.component.html',
  styleUrls: ['./car-card.component.css'],
})
export class CarCardComponent implements OnInit {
  @Input() car: any;
  owner: any;

  constructor(private ownersService: OwnersService) {}

  ngOnInit() {
    this.ownersService.get(this.car.ownerDni).subscribe((data: any) => {
      this.owner = data._embedded.owners[0];
    });
  }
}
