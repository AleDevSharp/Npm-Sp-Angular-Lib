// --------------------------------------------------------------
// Project: SpLib
// File name: toggle-list-page.component.ts
// File description: Showcase documentation page for SpToggleListComponent.
// Author: Alessio Giacché
// Date created: 11-11-2026
// License: MIT
// --------------------------------------------------------------

// Import
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SpToggleListComponent, SpToggleListOption } from '../../../../../sp-lib/src/public-api';
import { TranslatePipe } from '../../i18n/translate.pipe';

/**
 * ToggleListPageComponent
 * Showcase demo and API documentation for SpToggleListComponent.
 * @version 1.0.0
 * @since 2.0.0
 * @author Alessio Giacché
 */
@Component({
  selector: 'app-toggle-list-page',
  standalone: true,
  imports: [TranslatePipe, CommonModule, FormsModule, SpToggleListComponent],
  templateUrl: './toggle-list-page.component.html',
  styleUrl: './toggle-list-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToggleListPageComponent {
  // Selected plan in single-select demo
  public readonly selectedPlan = signal<string>('pro');

  // Selected features in multiple-select demo
  public readonly selectedFeatures = signal<string[]>(['backups', 'security']);

  // Subscription plan options
  public readonly planOptions: SpToggleListOption<string>[] = [
    {
      label: 'Starter Gratuito',
      value: 'starter',
      description: 'Perfetto per sviluppatori indipendenti, progetti personali e prime esplorazioni.',
      badge: '0€ / mese',
      icon: '◈'
    },
    {
      label: 'Pro Developer',
      value: 'pro',
      description: 'Accesso illimitato alla suite completa di componenti, aggiornamenti continui e supporto prioritario.',
      badge: '19€ / mese',
      icon: '★'
    },
    {
      label: 'Enterprise Custom',
      value: 'enterprise',
      description: 'SLA garantito al 99.99%, audit di sicurezza personalizzato e architettura su misura.',
      badge: 'Contattaci',
      icon: '▥'
    }
  ];

  // Feature options for multi-select grid demo
  public readonly featureOptions: SpToggleListOption<string>[] = [
    {
      label: 'Backup Automatici',
      value: 'backups',
      description: 'Istantanee giornaliere del database con rollback in un click.'
    },
    {
      label: 'Scudo di Sicurezza',
      value: 'security',
      description: 'Protezione DDoS avanzata, 2FA obbligatorio e crittografia end-to-end.'
    },
    {
      label: 'Analytics in Tempo Reale',
      value: 'analytics',
      description: 'Dashboard di monitoraggio delle metriche di utilizzo e performance.'
    },
    {
      label: 'Integrazione Webhook',
      value: 'webhooks',
      description: 'Notifiche eventi istantanee su Slack, Discord o server personalizzati.'
    }
  ];

  /**
   * Constructor for ToggleListPageComponent component
   */
  constructor() {}
}
