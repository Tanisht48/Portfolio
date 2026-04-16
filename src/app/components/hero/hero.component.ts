import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import anime from 'animejs';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent implements AfterViewInit {
  @ViewChild('tagline') taglineEl!: ElementRef<HTMLElement>;
  @ViewChild('subtext') subtextEl!: ElementRef<HTMLElement>;
  @ViewChild('ctas') ctasEl!: ElementRef<HTMLElement>;

  readonly headlineWords = ['Building', 'systems', 'that', 'run', 'at', 'scale.'];

  ngAfterViewInit(): void {
    const tl = anime.timeline({ easing: 'cubicBezier(0.25, 0.46, 0.45, 0.94)' });

    // 1. Tagline fades in first
    tl.add({
      targets: this.taglineEl.nativeElement,
      opacity: [0, 1],
      translateY: [12, 0],
      duration: 600,
      delay: 200,
    });

    // 2. Headline words slide up staggered
    tl.add({
      targets: '.hero-word',
      translateY: ['110%', '0%'],
      opacity: [0, 1],
      duration: 800,
      delay: anime.stagger(80),
    }, '-=300');

    // 3. Subtext and CTAs
    tl.add({
      targets: [this.subtextEl.nativeElement, this.ctasEl.nativeElement],
      opacity: [0, 1],
      translateY: [16, 0],
      duration: 600,
      delay: anime.stagger(120),
    }, '-=400');
  }
}
