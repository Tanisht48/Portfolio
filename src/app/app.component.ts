import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  NgZone,
} from '@angular/core';
import { NavComponent } from './components/nav/nav.component';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { ServerComponent } from './components/server/server.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { StackComponent } from './components/stack/stack.component';
import { ContactComponent } from './components/contact/contact.component';
import { WritingComponent } from './components/writing/writing.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavComponent,
    HeroComponent,
    AboutComponent,
    ServerComponent,
    ProjectsComponent,
    WritingComponent,
    StackComponent,
    ContactComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit, OnDestroy {
  @ViewChild('cursorDot') cursorDotEl!: ElementRef<HTMLElement>;
  @ViewChild('cursorRing') cursorRingEl!: ElementRef<HTMLElement>;

  private mouseX = -100;
  private mouseY = -100;
  private ringX = -100;
  private ringY = -100;
  private rafId = 0;
  private mouseMoveHandler!: (e: MouseEvent) => void;

  constructor(private zone: NgZone) {}

  ngAfterViewInit(): void {
    // Run cursor logic outside Angular zone to avoid unnecessary change detection
    this.zone.runOutsideAngular(() => {
      const dot = this.cursorDotEl.nativeElement;
      const ring = this.cursorRingEl.nativeElement;

      this.mouseMoveHandler = (e: MouseEvent) => {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
        dot.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      };

      document.addEventListener('mousemove', this.mouseMoveHandler);

      // Cursor ring follows with lerp
      const lerp = () => {
        this.ringX += (this.mouseX - this.ringX) * 0.12;
        this.ringY += (this.mouseY - this.ringY) * 0.12;
        ring.style.transform = `translate(${this.ringX - 16}px, ${this.ringY - 16}px)`;
        this.rafId = requestAnimationFrame(lerp);
      };
      this.rafId = requestAnimationFrame(lerp);

      // Cursor hover effects on interactive elements
      document.addEventListener('mouseover', (e: MouseEvent) => {
        const target = e.target as Element;
        if (target.closest('a, button, .project-row, [data-cursor-hover]')) {
          ring.classList.add('ring-hover');
        }
      });
      document.addEventListener('mouseout', (e: MouseEvent) => {
        const target = e.target as Element;
        if (target.closest('a, button, .project-row, [data-cursor-hover]')) {
          ring.classList.remove('ring-hover');
        }
      });
    });
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.rafId);
    document.removeEventListener('mousemove', this.mouseMoveHandler);
  }
}
