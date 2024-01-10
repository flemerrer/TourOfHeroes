import { Component, Input } from '@angular/core';
import { Hero } from '../../models/hero';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeroService } from '../../services/hero.service';

@Component({
  selector: 'app-hero-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, HeroService],
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.css'
})
export class HeroDetailComponent {
  
  hero!: Hero;

  constructor(private heroService: HeroService) {
    
  }
  
  ngOnInit(): void {
    this.getHeroDetails();
  }

  getHeroDetails(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.hero = this.heroService.getHeroById(id);
  }
  
}
