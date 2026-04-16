import { Component, AfterViewInit, ElementRef } from '@angular/core';
import anime from 'animejs';

interface Stat {
  value: number;
  suffix: string;
  label: string;
  display: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent implements AfterViewInit {
  stats: Stat[] = [
    { value: 2, suffix: '', label: 'YEARS EXPERIENCE', display: '0' },
    { value: 40, suffix: '%', label: 'FASTER PIPELINES', display: '0' },
    { value: 60, suffix: '%', label: 'LESS MANUAL WORK', display: '0' },
    { value: 5, suffix: '', label: 'LIVE PROJECTS', display: '0' },
  ];

  constructor(private el: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    const host = this.el.nativeElement;

    // Scroll reveal for text content
    const revealEls = host.querySelectorAll<HTMLElement>('.reveal');
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: entry.target,
              opacity: [0, 1],
              translateY: [28, 0],
              duration: 700,
              easing: 'easeOutQuart',
            });
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => revealObserver.observe(el));

    // Stat counter animation
    const statEls = host.querySelectorAll<HTMLElement>('.stat-number');
    const statObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = parseInt(
              (entry.target as HTMLElement).dataset['idx'] ?? '0',
              10
            );
            const stat = this.stats[idx];
            const counter = { val: 0 };
            anime({
              targets: counter,
              val: stat.value,
              duration: 2000,
              easing: 'easeOutExpo',
              update: () => {
                this.stats[idx].display =
                  Math.round(counter.val) + stat.suffix;
              },
              complete: () => {
                this.stats[idx].display = stat.value + stat.suffix;
              },
            });
            statObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    statEls.forEach((el) => statObserver.observe(el));
  }
}
