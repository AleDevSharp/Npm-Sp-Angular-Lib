// --------------------------------------------------------------
// Project: SpLib
// File name: chip-page.component.ts
// File description: Showcase documentation page for SpChipComponent.
// Author: Alessio Giacché
// Date created: 11-11-2026
// License: MIT
// --------------------------------------------------------------

// Import
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { SpBtnComponent, SpChipColor, SpChipComponent } from '../../../../../sp-lib/src/public-api';
import { TranslatePipe } from '../../i18n/translate.pipe';

interface FilterTag {
  id: string;
  name: string;
  color: SpChipColor;
}

/**
 * ChipPageComponent
 * Showcase demo and API documentation for SpChipComponent.
 * @version 1.0.0
 * @since 2.0.0
 * @author Alessio Giacché
 */
@Component({
  selector: 'app-chip-page',
  standalone: true,
  imports: [TranslatePipe, CommonModule, SpChipComponent, SpBtnComponent],
  templateUrl: './chip-page.component.html',
  styleUrl: './chip-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChipPageComponent {
  // Active filter tags signal for removable demo
  public readonly tags = signal<FilterTag[]>([
    { id: '1', name: 'Angular 19+', color: 'danger' },
    { id: '2', name: 'TypeScript', color: 'primary' },
    { id: '3', name: 'Signals API', color: 'success' },
    { id: '4', name: 'Web Components', color: 'warning' },
    { id: '5', name: 'SCSS Tokens', color: 'info' }
  ]);

  // Selected filter in interactive single/multi toggle demo
  public readonly selectedChips = signal<string[]>(['Frontend']);

  // Feedback message when clicking interactive chips
  public readonly clickedFeedback = signal<string>('Nessun chip cliccato');

  /**
   * Constructor for ChipPageComponent component
   */
  constructor() {}

  /**
   * Removes a tag by id with smooth exit motion.
   * @param id The tag id to remove
   * @returns void
   */
  public removeTag(id: string): void {
    this.tags.update(list => list.filter(item => item.id !== id));
  }

  /**
   * Restores all tags.
   * @returns void
   */
  public resetTags(): void {
    this.tags.set([
      { id: '1', name: 'Angular 19+', color: 'danger' },
      { id: '2', name: 'TypeScript', color: 'primary' },
      { id: '3', name: 'Signals API', color: 'success' },
      { id: '4', name: 'Web Components', color: 'warning' },
      { id: '5', name: 'SCSS Tokens', color: 'info' }
    ]);
  }

  /**
   * Handles chip selection click.
   * @param name The clicked chip name
   * @returns void
   */
  public toggleSelection(name: string): void {
    this.clickedFeedback.set(`Hai cliccato sul chip: "${name}"`);
    this.selectedChips.update(list => {
      if (list.includes(name)) {
        return list.filter(item => item !== name);
      }
      return [...list, name];
    });
  }
}
