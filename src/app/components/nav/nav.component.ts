import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import anime from 'animejs';

@Component({
  selector: 'app-nav',
  standalone: true,
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent implements AfterViewInit {
  @ViewChild('navEl') navEl!: ElementRef<HTMLElement>;
  menuOpen = false;

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  ngAfterViewInit(): void {
    // Hero word animation takes ~1.3s — nav fades in after that
    setTimeout(() => {
      anime({
        targets: this.navEl.nativeElement,
        opacity: [0, 1],
        duration: 700,
        easing: 'easeOutQuart',
      });
    }, 1400);
  }
}
