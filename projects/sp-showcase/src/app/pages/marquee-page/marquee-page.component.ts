// --------------------------------------------------------------
// Project: SpLib
// File name: marquee-page.component.ts
// File description: Showcase documentation page for SpMarqueeComponent.
// Author: Alessio Giacché
// Date created: 11-11-2026
// License: MIT
// --------------------------------------------------------------

// Import
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';

import {
  SpAvatarComponent,
  SpBadgeComponent,
  SpBtnComponent,
  SpMarqueeComponent,
  SpMarqueeDirection,
  SpMarqueeItemDirective,
  SpSwitchComponent
} from '../../../../../sp-lib/src/public-api';
import { TranslatePipe } from '../../i18n/translate.pipe';

/**
 * MarqueePageComponent
 * Showcase demo and API documentation for SpMarqueeComponent.
 *
 * @version 1.0.0
 * @since 2.0.0
 * @author Alessio Giacché
 */
@Component({
  selector: 'app-marquee-page',
  standalone: true,
  imports: [TranslatePipe, 
    CommonModule,
    SpMarqueeComponent,
    SpMarqueeItemDirective,
    SpBtnComponent,
    SpSwitchComponent,
    SpAvatarComponent,
    SpBadgeComponent
  ],
  templateUrl: './marquee-page.component.html',
  styleUrl: './marquee-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarqueePageComponent {
  // Reference to main playground marquee component
  public readonly playgroundMarquee = viewChild<SpMarqueeComponent>('playgroundMarquee');

  // The active direction for playground demo
  public readonly direction = signal<SpMarqueeDirection>('left');

  // The scrolling speed in seconds for one complete cycle
  public readonly speed = signal<number>(20);

  // The toggle indicating whether edge gradient fade is applied
  public readonly fade = signal<boolean>(true);

  // The toggle indicating whether scrolling pauses upon mouse hover
  public readonly pauseOnHover = signal<boolean>(true);

  // The toggle indicating whether clicking pauses the marquee
  public readonly pauseOnClick = signal<boolean>(false);

  // The toggle indicating whether direction is inverted
  public readonly reverse = signal<boolean>(false);

  // Tech stack items for main interactive ticker
  public readonly techLogos = [
    { name: 'Angular', icon: '🅰️', category: 'Framework' },
    { name: 'TypeScript', icon: '🔷', category: 'Language' },
    { name: 'RxJS', icon: '⚡', category: 'Reactive' },
    { name: 'SCSS Tokens', icon: '🎨', category: 'Styling' },
    { name: 'Vite & esbuild', icon: '🚀', category: 'Bundler' },
    { name: 'Karma & Jasmine', icon: '🧪', category: 'Testing' },
    { name: 'Node.js', icon: '🟢', category: 'Runtime' },
    { name: 'WAI-ARIA', icon: '♿', category: 'Accessibility' }
  ];

  // Testimonial cards for rich template marquee
  public readonly reviews = [
    {
      author: 'Marco Rossi',
      role: 'Frontend Lead',
      avatar: 'MR',
      rating: 5,
      text: 'Un esempio di card con testo abbastanza lungo da mostrare la lettura durante la pausa.'
    },
    {
      author: 'Elena Bianchi',
      role: 'Senior Product Designer',
      avatar: 'EB',
      rating: 5,
      text: 'Avatar, ruolo e contenuto sono composti in un template personalizzato.'
    },
    {
      author: 'Davide Moretti',
      role: 'Fullstack Architect',
      avatar: 'DM',
      rating: 5,
      text: 'Ogni card è ripetuta nel tracciato insieme alle altre recensioni dimostrative.'
    },
    {
      author: 'Sofia Conti',
      role: 'Design System Engineer',
      avatar: 'SC',
      rating: 5,
      text: 'Il passaggio del mouse sospende temporaneamente lo scorrimento della riga.'
    }
  ];

  // Breaking news items for vertical ticker
  public readonly newsItems = [
    { time: '12:00', tag: 'RELEASE', text: 'Esempio di annuncio per una nuova versione del prodotto.' },
    { time: '11:45', tag: 'UPDATE', text: 'Esempio di aggiornamento della raccolta di componenti.' },
    { time: '11:15', tag: 'PERF', text: 'Esempio di notifica sullo stato delle verifiche.' },
    { time: '10:30', tag: 'FEATURE', text: 'Esempio di annuncio relativo al tema dell’interfaccia.' }
  ];


  /**
   * Sets the scrolling direction for the playground.
   * @param dir The new direction
   * @returns void
   */
  public setDirection(dir: SpMarqueeDirection): void {
    this.direction.set(dir);
  }

  /**
   * Sets the scroll speed in seconds.
   * @param s The duration in seconds
   * @returns void
   */
  public setSpeed(s: number): void {
    this.speed.set(s);
  }

  /**
   * Toggles the play/pause state of the playground marquee.
   * @returns void
   */
  public togglePlayPause(): void {
    const marquee = this.playgroundMarquee();
    if (marquee) {
      marquee.togglePause();
    }
  }

  /**
   * Returns whether the playground marquee is currently paused.
   * @returns A boolean indicating if paused
   */
  public isMarqueePaused(): boolean {
    const marquee = this.playgroundMarquee();
    return marquee ? marquee.isPaused() : false;
  }
}
