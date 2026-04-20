import { Component, AfterViewInit, ElementRef } from '@angular/core';
import anime from 'animejs';

export interface Article {
  num: string;
  title: string;
  excerpt: string;
  topics: string[];
  status: 'draft' | 'published' | 'in-progress';
  statusLabel: string;
  url: string | null;
}

@Component({
  selector: 'app-writing',
  standalone: true,
  templateUrl: './writing.component.html',
  styleUrl: './writing.component.scss',
})
export class WritingComponent implements AfterViewInit {
  articles: Article[] = [
    {
      num: '001',
      title: 'Phone to Linux Server — From Idea to Open Source Project',
      excerpt:
        'That old Android phone in your drawer has a Snapdragon SoC, 6 GB of LPDDR4, hardware KVM extensions, and a 4000 mAh battery. This is the full technical record of turning one into a production-grade ARM64 server — PostmarketOS, Docker, .NET 8, Prometheus, Cloudflare Tunnel — and why the timing has never been better.',
      topics: ['PostmarketOS', 'KVM', 'ARM64', 'Self-hosting', 'Open Source'],
      status: 'in-progress',
      statusLabel: 'IN PROGRESS',
      url: null,
    },
  ];

  constructor(private el: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    const host = this.el.nativeElement;

    const revealEls = host.querySelectorAll<HTMLElement>('.reveal');
    const revealObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: entry.target,
              opacity: [0, 1],
              translateY: [24, 0],
              duration: 700,
              easing: 'easeOutQuart',
            });
            revealObs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => revealObs.observe(el));

    const rows = host.querySelectorAll<HTMLElement>('.article-row');
    const rowObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: entry.target,
              opacity: [0, 1],
              translateY: [20, 0],
              duration: 600,
              easing: 'easeOutQuart',
            });
            rowObs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    rows.forEach((row) => rowObs.observe(row));
  }
}
