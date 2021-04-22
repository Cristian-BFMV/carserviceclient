import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from '../shared/car/car.service';
import { GiphyService } from '../shared/giphy/giphy.service';
import { OwnersService } from '../shared/owner/owner.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.css'],
})
export class CarEditComponent implements OnInit, OnDestroy {
  car: any = {};
  owners: Array<any>;

  sub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private carService: CarService,
    private giphyService: GiphyService,
    private ownerService: OwnersService
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      const id = params.id;
      if (id) {
        this.carService.get(id).subscribe((car: any) => {
          if (car) {
            this.getOwners();
            this.car = car;
            this.car.href = car._links.self.href;
            this.giphyService
              .get(car.name)
              .subscribe((url) => (car.giphyUrl = url));
          } else {
            console.log(`Car with id '${id}' not found, returning to list`);
            this.gotoList();
          }
        });
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getOwners() {
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

  gotoList() {
    this.router.navigate(['/car-list']);
  }

  save(form: NgForm) {
    this.carService.save(form).subscribe(
      () => {
        this.gotoList();
      },
      (error) => console.error(error)
    );
  }

  remove(href: string) {
    this.carService.remove(href).subscribe(
      () => {
        this.gotoList();
      },
      (error) => console.error(error)
    );
  }
}
