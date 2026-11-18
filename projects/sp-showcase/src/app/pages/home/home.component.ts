// --------------------------------------------------------------
// Project: SpLib
// File name: home.component.ts
// File description: Showcase home landing page introducing SpLib with quick start and feature highlights.
// Author: Alessio Giacché
// Date created: 18-11-2025
// License: MIT
// --------------------------------------------------------------

// Import
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../i18n/translate.pipe';

/**
 * HomeComponent
 * @version 2.0.0
 * @since 1.0.0
 * @author Alessio Giacché
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TranslatePipe, CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  // Flag indicating if install command was copied
  public readonly isCopied = signal<boolean>(false);

  // The npm installation command string
  public readonly installCommand = 'npm install @aledevsharp/sp-lib';

  /**
   * Constructor for HomeComponent component
   */
  constructor() {}

  /**
   * Copies the install command string to the user clipboard.
   * @returns void
   */
  public copyInstallCommand(): void {
    navigator.clipboard.writeText(this.installCommand).then(() => {
      this.isCopied.set(true);
      setTimeout(() => this.isCopied.set(false), 2000);
    });
  }
}
