// --------------------------------------------------------------
// Project: SpLib
// File name: i18n.service.ts
// File description: Showcase-only runtime translations with English defaults and Italian support.
// Author: Alessio Giacché
// Date created: 17-11-2026
// License: MIT
// --------------------------------------------------------------

// Import
import { DOCUMENT } from '@angular/common';
import { effect, inject, Injectable, signal } from '@angular/core';
import { Meta } from '@angular/platform-browser';

import en from './en.json';
import it from './it.json';

// The supported showcase languages
export type ShowcaseLanguage = 'en' | 'it';

// The bundled catalogs avoid network requests or untranslated loading states
const catalogs: Record<ShowcaseLanguage, Record<string, string>> = { en, it };

// The fields that contain display text in demo option and item objects
const displayFields = new Set(['label', 'title', 'subtitle', 'description', 'alt', 'text', 'tooltip', 'category', 'role']);

/**
 * I18nService
 * @version 1.0.0
 * @since 2.0.1
 * @author Alessio Giacché
 */
@Injectable({ providedIn: 'root' })
export class I18nService {
  // The browser document
  private readonly document = inject(DOCUMENT);

  // The Meta service
  private readonly metaService = inject(Meta);

  // The persisted language preference key
  private readonly storageKey = 'sp-showcase.language';

  // The active language, defaulting to English independently of browser locale
  private readonly _language = signal<ShowcaseLanguage>(this.readPreference());

  // The read-only active language exposed to templates
  public readonly language = this._language.asReadonly();

  // The source-text aliases used by existing showcase demo data
  private readonly aliases = new Map<string, string>();

  // The cached strings for the current language
  private readonly textCache = new Map<string, string>();

  // The stable translated copies of demo arrays and objects
  private objectCache = new WeakMap<object, unknown>();

  /**
   * Builds source aliases and synchronizes document language metadata.
   */
  constructor() {
    for (const catalog of [it, en]) {
      for (const [key, text] of Object.entries(catalog)) {
        if (!this.aliases.has(text)) this.aliases.set(text, key);
      }
    }

    effect(() => {
      const language = this.language();
      this.document.documentElement.lang = language;
      this.metaService.updateTag({ property: 'og:locale', content: language === 'it' ? 'it_IT' : 'en_US' });
    });
  }

  /**
   * Changes language without navigating or resetting demonstration state.
   * @param language The requested supported language
   * @returns void
   */
  public setLanguage(language: string): void {
    if ((language !== 'en' && language !== 'it') || language === this.language()) return;
    this.textCache.clear();
    this.objectCache = new WeakMap<object, unknown>();
    this._language.set(language);
    try {
      this.document.defaultView?.localStorage.setItem(this.storageKey, language);
    } catch {
      // Language switching remains available when browser storage is blocked.
    }
  }

  /**
   * Translates catalog keys, demo feedback and display fields without changing model values.
   * @param value The text, primitive or demo collection to localize
   * @returns The localized value, preserving its shape and technical data
   */
  public translate<T>(value: T): T {
    // Reading the signal here lets OnPush templates track their language dependency.
    this.language();
    if (typeof value === 'string') return this.translateText(value) as T;
    if (!value || typeof value !== 'object') return value;
    const cached = this.objectCache.get(value);
    if (cached) return cached as T;

    const translated = Array.isArray(value)
      ? value.map((item: unknown) => this.translate(item))
      : Object.fromEntries(
          Object.entries(value).map(([key, item]: [string, unknown]) => [
            key,
            displayFields.has(key) || Array.isArray(item) ? this.translate(item) : item
          ])
        );
    this.objectCache.set(value, translated);
    return translated as T;
  }

  /**
   * Resolves a key or original display string, including parameterized demo feedback.
   * @param value The catalog key or display text
   * @returns The translation, or the original text for technical and user-entered values
   */
  private translateText(value: string): string {
    const cached = this.textCache.get(value);
    if (cached !== undefined) return cached;
    const text = value.replace(/\s+/g, ' ').trim();
    const key = Object.hasOwn(catalogs.en, text) ? text : this.aliases.get(text);
    let translated = key ? (catalogs[this.language()][key] ?? catalogs.en[key] ?? value) : value;

    if (!key) {
      for (const patternKey of Object.keys(catalogs.en).filter((entry) => entry.startsWith('feedback.'))) {
        for (const language of ['it', 'en'] as const) {
          const source = catalogs[language][patternKey];
          const parts = source.split(/(\{\{\w+\}\})/);
          const names = parts.filter((part) => part.startsWith('{{')).map((part) => part.slice(2, -2));
          const pattern = parts.map((part) => (part.startsWith('{{') ? '(.+?)' : part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))).join('');
          const match = new RegExp(`^${pattern}$`).exec(text);
          if (!match) continue;
          translated = catalogs[this.language()][patternKey].replace(/\{\{(\w+)\}\}/g, (_, name: string) =>
            this.translateText(match[names.indexOf(name) + 1])
          );
          break;
        }
        if (translated !== value) break;
      }
    }

    this.textCache.set(value, translated);
    return translated;
  }

  /**
   * Reads a supported saved choice; a first visit always uses English.
   * @returns The saved language or English
   */
  private readPreference(): ShowcaseLanguage {
    try {
      return this.document.defaultView?.localStorage.getItem(this.storageKey) === 'it' ? 'it' : 'en';
    } catch {
      return 'en';
    }
  }
}
