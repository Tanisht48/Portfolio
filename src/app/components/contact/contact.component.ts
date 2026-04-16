import { Component, AfterViewInit, ElementRef } from '@angular/core';
import anime from 'animejs';

@Component({
  selector: 'app-contact',
  standalone: true,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent implements AfterViewInit {
  email = 'tanishtgupta42@gmail.com';
  phone = ''; // TODO: add phone number with country code
  linkedIn = ''; // TODO: add LinkedIn URL e.g. https://linkedin.com/in/your-handle

  constructor(private el: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    const host = this.el.nativeElement;

    const revealEls = host.querySelectorAll<HTMLElement>('.reveal');
    const obs = new IntersectionObserver(
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
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => obs.observe(el));

    // Stagger contact links
    const links = host.querySelectorAll<HTMLElement>('.contact-link');
    const linkObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: entry.target,
              opacity: [0, 1],
              translateY: [16, 0],
              delay: anime.stagger(80),
              duration: 600,
              easing: 'easeOutQuart',
            });
            linkObs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    links.forEach((l) => linkObs.observe(l));
  }
}
