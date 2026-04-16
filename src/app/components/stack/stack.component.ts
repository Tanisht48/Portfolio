import { Component, AfterViewInit, ElementRef } from '@angular/core';
import anime from 'animejs';

interface StackCell {
  category: string;
  items: string[];
}

@Component({
  selector: 'app-stack',
  standalone: true,
  templateUrl: './stack.component.html',
  styleUrl: './stack.component.scss',
})
export class StackComponent implements AfterViewInit {
  cells: StackCell[] = [
    {
      category: 'Languages',
      items: ['C#', 'Java', 'TypeScript', 'Python', 'SQL'],
    },
    {
      category: 'Infrastructure',
      items: ['Docker', 'Cloudflare Tunnel', 'Termux', 'Alpine Linux', 'Nginx', 'AWS EC2'],
    },
    {
      category: 'Data & Messaging',
      items: ['Redis', 'PostgreSQL', 'MS SQL Server', 'RabbitMQ', 'SignalR'],
    },
    {
      category: 'Observability',
      items: ['Grafana', 'Prometheus', 'Hangfire', 'Serilog', 'ELK Stack'],
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

    const cells = host.querySelectorAll<HTMLElement>('.stack-cell');
    const cellObs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          anime({
            targets: cells,
            opacity: [0, 1],
            translateY: [24, 0],
            duration: 700,
            delay: anime.stagger(100),
            easing: 'easeOutQuart',
          });
          cells.forEach((c) => cellObs.unobserve(c));
        }
      },
      { threshold: 0.15 }
    );
    cells.forEach((c) => cellObs.observe(c));
  }
}
