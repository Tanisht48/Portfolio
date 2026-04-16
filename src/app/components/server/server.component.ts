import { Component, AfterViewInit, ElementRef } from '@angular/core';
import anime from 'animejs';

interface ServerCard {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-server',
  standalone: true,
  templateUrl: './server.component.html',
  styleUrl: './server.component.scss',
})
export class ServerComponent implements AfterViewInit {
  cards: ServerCard[] = [
    {
      icon: '01',
      title: 'Android → Linux Server',
      description:
        'Termux turns a spare OnePlus into a full Linux environment. Alpine container runs my services with near-zero overhead.',
    },
    {
      icon: '02',
      title: 'Cloudflare Tunnel',
      description:
        'Zero open ports. Cloudflare tunnels traffic directly to the container &mdash; TLS termination, DDoS protection, global edge.',
    },
    {
      icon: '03',
      title: 'Full Observability Stack',
      description:
        'Grafana + Prometheus + custom exporters. Every request tracked, every anomaly alerted. Production-grade on ₹0/month.',
    },
  ];

  terminalLines = [
    { prompt: '$', command: 'ssh tanisht@server.tgupta.dev', output: null },
    { prompt: null, command: null, output: 'Connected to OnePlus 7T — Termux / Alpine Linux' },
    { prompt: null, command: null, output: 'uptime: 47 days, 3 hours' },
    { prompt: '$', command: 'docker ps --format "table {{.Names}}\\t{{.Status}}\\t{{.Ports}}"', output: null },
    { prompt: null, command: null, output: 'NAMES              STATUS          PORTS' },
    { prompt: null, command: null, output: 'redis              Up 47 days      6379/tcp' },
    { prompt: null, command: null, output: 'rate-limiter       Up 47 days      0.0.0.0:5000->5000/tcp' },
    { prompt: null, command: null, output: 'grafana            Up 47 days      0.0.0.0:3000->3000/tcp' },
    { prompt: null, command: null, output: 'prometheus         Up 47 days      0.0.0.0:9090->9090/tcp' },
    { prompt: '$', command: 'cat /proc/loadavg', output: null },
    { prompt: null, command: null, output: '0.21 0.18 0.14 2/184 3847' },
    { prompt: '$', command: '▌', output: null },
  ];

  constructor(private el: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    const host = this.el.nativeElement;

    // Reveal heading + cards
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
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => revealObs.observe(el));

    // Terminal typewriter animation
    const terminal = host.querySelector('.terminal-body');
    if (terminal) {
      const termObs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const lines = terminal.querySelectorAll<HTMLElement>('.t-line');
              anime({
                targets: lines,
                opacity: [0, 1],
                duration: 200,
                delay: anime.stagger(180),
                easing: 'linear',
              });
              termObs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.3 }
      );
      termObs.observe(terminal);
    }

    // Cards stagger
    const cards = host.querySelectorAll<HTMLElement>('.server-card');
    const cardObs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          anime({
            targets: cards,
            opacity: [0, 1],
            translateY: [32, 0],
            duration: 700,
            delay: anime.stagger(120),
            easing: 'easeOutQuart',
          });
          cards.forEach((c) => cardObs.unobserve(c));
        }
      },
      { threshold: 0.2 }
    );
    cards.forEach((c) => cardObs.observe(c));
  }
}
