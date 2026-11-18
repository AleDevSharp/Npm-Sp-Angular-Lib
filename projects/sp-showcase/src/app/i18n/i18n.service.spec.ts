// --------------------------------------------------------------
// Project: SpLib
// File name: i18n.service.spec.ts
// File description: Regression coverage for showcase language changes and stable demo data.
// Author: Alessio Giacché
// Date created: 17-11-2026
// License: MIT
// --------------------------------------------------------------

// Import
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router, TitleStrategy } from '@angular/router';

import { ShowcaseTitleStrategy } from '../showcase-title.strategy';
import en from './en.json';
import { I18nService } from './i18n.service';
import italianCatalog from './it.json';
import { TranslatePipe } from './translate.pipe';
import { TranslateLabelsDirective } from './translate-labels.directive';

/**
 * TranslationHostComponent
 * @version 1.0.0
 * @since 2.0.1
 * @author Alessio Giacché
 */
@Component({
  standalone: true,
  imports: [TranslateLabelsDirective, TranslatePipe],
  template: `
    <section showcaseI18nLabels>
      <p>{{ 'home.002' | translate }}</p>
      <button aria-label="Rimuovi">Demo action</button>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
class TranslationHostComponent {}

describe('Showcase internationalization', () => {
  beforeEach(() => {
    localStorage.removeItem('sp-showcase.language');
    TestBed.configureTestingModule({
      imports: [TranslationHostComponent],
      providers: [
        provideRouter([{ path: 'demo', component: TranslationHostComponent, title: 'meta.001', data: { description: 'meta.002' } }]),
        { provide: TitleStrategy, useClass: ShowcaseTitleStrategy }
      ]
    });
  });

  afterEach(() => localStorage.removeItem('sp-showcase.language'));

  it('has matching catalogs and preserves interpolation parameters', () => {
    expect(Object.keys(en).sort()).toEqual(Object.keys(italianCatalog).sort());
    for (const key of Object.keys(en) as (keyof typeof en)[]) {
      expect(en[key].trim()).withContext(key).not.toBe('');
      expect(italianCatalog[key].trim()).withContext(key).not.toBe('');
      expect(en[key].match(/\{\{\w+\}\}/g) ?? [])
        .withContext(key)
        .toEqual(italianCatalog[key].match(/\{\{\w+\}\}/g) ?? []);
    }
  });

  it('defaults to English and accepts only supported saved preferences', () => {
    localStorage.setItem('sp-showcase.language', 'fr');
    const service = TestBed.inject(I18nService);
    expect(service.language()).toBe('en');
    service.setLanguage('it');
    expect(localStorage.getItem('sp-showcase.language')).toBe('it');
    service.setLanguage('fr');
    expect(service.language()).toBe('it');
  });

  it('restores an explicit Italian choice', () => {
    localStorage.setItem('sp-showcase.language', 'it');
    expect(TestBed.inject(I18nService).language()).toBe('it');
  });

  it('continues switching when storage is unavailable', () => {
    spyOn(Storage.prototype, 'getItem').and.throwError('Storage blocked');
    spyOn(Storage.prototype, 'setItem').and.throwError('Storage blocked');
    const service = TestBed.inject(I18nService);
    expect(service.language()).toBe('en');
    expect(() => service.setLanguage('it')).not.toThrow();
    expect(service.language()).toBe('it');
  });

  it('localizes demo captions without changing values, identities, callbacks or original objects', () => {
    const service = TestBed.inject(I18nService);
    const command = jasmine.createSpy('command');
    const options = [{ id: 'it', label: 'Italia', value: 'it', disabled: true, command }];
    const result = service.translate(options);
    expect(result[0].label).toBe('Italy');
    expect(result[0].value).toBe('it');
    expect(result[0].id).toBe('it');
    expect(result[0].disabled).toBeTrue();
    expect(result[0].command).toBe(command);
    expect(options[0].label).toBe('Italia');
    expect(service.translate(options)).toBe(result);
    service.setLanguage('it');
    expect(service.translate(options)[0].label).toBe('Italia');
    expect(service.translate(options)).not.toBe(result);
  });

  it('translates composed feedback in either direction without changing its parameters', () => {
    const service = TestBed.inject(I18nService);
    expect(service.translate('Hai cliccato su: Alpha!')).toBe('You clicked: Alpha!');
    expect(service.translate('Modale md aperta')).toBe('Modal md opened');
    expect(service.translate('Finestra Modale Dimensione (LG)')).toBe('Modal Window Size (LG)');
    service.setLanguage('it');
    expect(service.translate('Selected action: Copy Link')).toBe('Azione selezionata: Copia Link');
    expect(service.translate('unknown-key')).toBe('unknown-key');
    expect(service.translate(42)).toBe(42);
  });

  it('updates OnPush templates when only the language changes', () => {
    const fixture = TestBed.createComponent(TranslationHostComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain(en['home.002']);
    TestBed.inject(I18nService).setLanguage('it');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain(italianCatalog['home.002']);
  });

  it('localizes fixed accessible labels, including controls inserted after the first render', async () => {
    const fixture = TestBed.createComponent(TranslationHostComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(button.getAttribute('aria-label')).toBe('Remove');
    expect(button.textContent).toBe('Demo action');
    const added = document.createElement('button');
    added.setAttribute('aria-label', 'Chiudi finestra modale');
    fixture.nativeElement.querySelector('section').appendChild(added);
    await new Promise<void>((resolve) => setTimeout(resolve, 0));
    expect(added.getAttribute('aria-label')).toBe('Close modal window');
    TestBed.inject(I18nService).setLanguage('it');
    fixture.detectChanges();
    await fixture.whenStable();
    expect(button.getAttribute('aria-label')).toBe('Rimuovi');
    expect(added.getAttribute('aria-label')).toBe('Chiudi finestra modale');
  });

  it('updates document language and route metadata without another navigation', async () => {
    await TestBed.inject(Router).navigateByUrl('/demo');
    TestBed.flushEffects();
    expect(document.title).toBe(en['meta.001']);
    const url = TestBed.inject(Router).url;
    TestBed.inject(I18nService).setLanguage('it');
    TestBed.flushEffects();
    expect(TestBed.inject(Router).url).toBe(url);
    expect(document.documentElement.lang).toBe('it');
    expect(document.title).toBe(italianCatalog['meta.001']);
    expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toBe(italianCatalog['meta.002']);
    expect(document.querySelector('meta[property="og:locale"]')?.getAttribute('content')).toBe('it_IT');
    expect(document.querySelector('meta[property="og:title"]')?.getAttribute('content')).toBe(italianCatalog['meta.001']);
  });
});
