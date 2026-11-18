// --------------------------------------------------------------
// Project: SpLib
// File name: sp-tabs.types.ts
// File description: Type definitions and interfaces for the animated tabs suite.
// Author: Alessio Giacché
// Date created: 11-11-2026
// License: MIT
// --------------------------------------------------------------

import { InjectionToken } from '@angular/core';

/**
 * Visual styling variant for animated tabs.
 */
export type SpTabsVariant = 'line' | 'pill' | 'enclosed';

/**
 * Spatial layout orientation for tabs.
 */
export type SpTabsOrientation = 'horizontal' | 'vertical';

/**
 * Size scale preset for tabs typography and padding.
 */
export type SpTabsSize = 'sm' | 'md' | 'lg';

/**
 * Interface contract for tabs container.
 */
export interface SpTabsContainer {
  selectTab(index: number): void;
}

/**
 * Injection token for tabs container.
 */
export const SP_TABS = new InjectionToken<SpTabsContainer>('SP_TABS');
