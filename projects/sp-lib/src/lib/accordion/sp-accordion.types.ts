// --------------------------------------------------------------
// Project: SpLib
// File name: sp-accordion.types.ts
// File description: Type definitions and interfaces for the accordion suite.
// Author: Alessio Giacché
// Date created: 11-11-2026
// License: MIT
// --------------------------------------------------------------

import { InjectionToken } from '@angular/core';

/**
 * Visual presentation variant for accordion.
 */
export type SpAccordionVariant = 'contained' | 'separated' | 'ghost';

/**
 * Size preset for accordion headers and paddings.
 */
export type SpAccordionSize = 'sm' | 'md' | 'lg';

/**
 * Interface contract for accordion parent container.
 */
export interface SpAccordionContainer {
  handleItemToggle(item: any): void;
}

/**
 * Injection token for parent accordion container to avoid circular references.
 */
export const SP_ACCORDION = new InjectionToken<SpAccordionContainer>('SP_ACCORDION');
