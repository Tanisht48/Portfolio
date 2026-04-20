import { Component, AfterViewInit, ElementRef } from '@angular/core';
import anime from 'animejs';

export interface Project {
  num: string;
  title: string;
  description: string;
  tech: string[];
  status: 'live' | 'in-dev' | 'professional' | 'published' | null;
  statusLabel: string;
  url: string | null;
  githubUrl: string | null;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent implements AfterViewInit {
  // ─────────────────────────────────────────────────────────────
  // TO ADD A NEW PROJECT: copy a block below and append to array.
  // TO ADD A LIVE URL: set url: 'https://...'
  // ─────────────────────────────────────────────────────────────
  projects: Project[] = [
    {
      num: '001',
      title: 'Smart Rate Limiter',
      description:
        'Production-grade distributed rate limiter with sliding-window algorithm, real-time dashboards, and sub-millisecond Redis latency. Published as a NuGet package.',
      tech: ['.NET Core', 'Redis', 'Grafana', 'Prometheus', 'Docker'],
      status: 'published',
      statusLabel: 'PUBLISHED — NUGET',
      url: null,
      githubUrl: 'https://github.com/Tanisht48/RateLimiter',
    },
    {
      num: '002',
      title: 'Atlas Eye Live Stream Handler',
      description:
        'Real-time video ingestion and processing pipeline. FFmpeg-powered transcoding with Hangfire background jobs, PostgreSQL event log, and Angular live-view dashboard.',
      tech: ['.NET Core', 'FFmpeg', 'Hangfire', 'PostgreSQL', 'Angular'],
      status: 'in-dev',
      statusLabel: 'IN DEVELOPMENT',
      url: null,
      githubUrl: 'https://github.com/Tanisht48/StreamHandler',
    },
    {
      num: '003',
      title: 'ICCC — Integrated Command & Control Centre',
      description:
        'All-in-one enterprise platform integrating cameras, NVRs, VMS, LiDARs, FASTags, PA systems, PIDs, ECBs, and Advantech I/O devices under a single command centre. Features include real-time alerts against device events, live map overlays, remote device control, analytics dashboards, and automated reporting — deployed across active smart-city and highway sites.',
      tech: ['.NET Core', 'Angular', 'SignalR', 'OpenLayers', 'PostgreSQL', 'FFmpeg'],
      status: 'professional',
      statusLabel: 'PROFESSIONAL — NDA',
      url: null,
      githubUrl: null,
    },
    {
      num: '004',
      title: 'Blogging Platform API',
      description:
        'RESTful content API with full CRUD, JWT authentication, category management, and comprehensive JUnit 5 test coverage. Deployed on AWS EC2.',
      tech: ['Java', 'Spring Boot', 'AWS EC2', 'JUnit 5'],
      status: null,
      statusLabel: '',
      url: null,
      githubUrl: "https://github.com/Tanisht48/Blogging_Platform_Backend_Api_With_Aws"
    },
  ];

  constructor(private el: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    const host = this.el.nativeElement;

    // Reveal heading
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

    // Rows stagger in
    const rows = host.querySelectorAll<HTMLElement>('.project-row');
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
