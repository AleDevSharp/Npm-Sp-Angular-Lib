// --------------------------------------------------------------
// Project: SpLib
// File name: app.component.ts
// File description: Root showcase shell component with navigation and content scroll management.
// Author: Alessio Giacché
// Date created: 18-11-2025
// License: MIT
// --------------------------------------------------------------

// Import
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { I18nService } from './i18n/i18n.service';
import { TranslatePipe } from './i18n/translate.pipe';
import { TranslateLabelsDirective } from './i18n/translate-labels.directive';

/**
 * AppComponent
 * @version 2.0.0
 * @since 1.0.0
 * @author Alessio Giacché
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TranslateLabelsDirective, TranslatePipe, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  // The I18nService service
  public readonly i18n = inject(I18nService);

  // Application title name
  public readonly title = 'SpLib Showcase';

  // Whether the mobile navigation disclosure is expanded
  public readonly navigationOpen = signal(false);

  /**
   * Closes mobile navigation and returns keyboard focus to its toggle.
   * @param toggle The navigation disclosure button
   * @returns void
   */
  public closeNavigation(toggle: HTMLButtonElement): void {
    if (this.navigationOpen()) {
      this.navigationOpen.set(false);
      toggle.focus();
    }
  }

  /**
   * Closes the mobile menu after selecting a link and focuses the content.
   * @param event The click bubbling from the navigation
   * @param contentArea The independently scrolling showcase content viewport
   * @returns void
   */
  public onNavigationClick(event: MouseEvent, contentArea: HTMLElement): void {
    if (this.navigationOpen() && event.target instanceof Element && event.target.closest('a')) {
      this.navigationOpen.set(false);
      contentArea.focus({ preventScroll: true });
    }
  }

  /**
   * Resets the content viewport when a routed page is activated.
   * @param contentArea The independently scrolling showcase content viewport
   * @returns void
   */
  public resetContentScroll(contentArea: HTMLElement): void {
    this.navigationOpen.set(false);
    contentArea.scrollTop = 0;
    contentArea.scrollLeft = 0;
  }
}
