import { Component, Input, inject } from '@angular/core';
import { Hero } from '../../models/hero';
import { CommonModule } from '@angular/common';
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
  route: ActivatedRoute = inject(ActivatedRoute);

  constructor(private heroService: HeroService) {
    
  }
  
  ngOnInit(): void {
    this.getHeroDetails();
  }

  getHeroDetails(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHeroById(id).subscribe((x) => this.hero = x);
  }
  
}
