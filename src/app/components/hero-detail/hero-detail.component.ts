import { Component, Input, inject } from '@angular/core';
import { Hero } from '../../models/hero';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeroService } from '../../services/hero.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hero-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.css'
})
export class HeroDetailComponent {
  
  hero!: Hero;
  // route: ActivatedRoute = inject(ActivatedRoute);
  // now injected directly in constructor

  id = Number(this.route.snapshot.paramMap.get('id'));

  constructor(
    private heroService: HeroService, 
    private route: ActivatedRoute,
    private location: Location
    ) {
    
  }
  
  ngOnInit(): void {
    this.getHeroDetails();
  }

  getHeroDetails(): void {
    this.heroService.getHeroById(this.id).subscribe((x) => this.hero = x);
  }
  
  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.hero) {
      this.heroService.updateHero(this.hero);
      this.goBack();
    }
  }

}
