import { Routes } from '@angular/router';

// Application routes
export const routes: Routes = [
  { path: '', redirectTo: 'showcase', pathMatch: 'full' },
  {
    path: 'showcase',
    title: 'meta.001',
    data: {
      description: 'meta.002'
    },
    loadComponent: () => import('../app/pages/home/home.component').then((c) => c.HomeComponent)
  },
  {
    path: 'buttons',
    title: 'meta.003',
    data: {
      description: 'meta.004'
    },
    loadComponent: () => import('../app/pages/buttons-page/buttons-page.component').then((c) => c.ButtonsPageComponent)
  },
  {
    path: 'inputs',
    title: 'meta.005',
    data: {
      description: 'meta.006'
    },
    loadComponent: () => import('../app/pages/inputs-page/inputs-page.component').then((c) => c.InputsPageComponent)
  },
  {
    path: 'select',
    title: 'meta.007',
    data: {
      description: 'meta.008'
    },
    loadComponent: () => import('../app/pages/select-page/select-page.component').then((c) => c.SelectPageComponent)
  },
  {
    path: 'switch',
    title: 'meta.009',
    data: {
      description: 'meta.010'
    },
    loadComponent: () => import('../app/pages/switch-page/switch-page.component').then((c) => c.SwitchPageComponent)
  },
  {
    path: 'progress-bars',
    title: 'meta.011',
    data: {
      description: 'meta.012'
    },
    loadComponent: () => import('../app/pages/progress-bars-page/progress-bars-page.component').then((c) => c.ProgressBarsPageComponent)
  },
  {
    path: 'dividers',
    title: 'meta.013',
    data: {
      description: 'meta.014'
    },
    loadComponent: () => import('../app/pages/dividers-page/dividers-page.component').then((c) => c.DividersPageComponent)
  },
  {
    path: 'tooltip',
    title: 'meta.015',
    data: {
      description: 'meta.016'
    },
    loadComponent: () => import('../app/pages/tooltip-page/tooltip-page.component').then((c) => c.TooltipPageComponent)
  },
  {
    path: 'card',
    title: 'meta.017',
    data: {
      description: 'meta.018'
    },
    loadComponent: () => import('../app/pages/card-page/card-page.component').then((c) => c.CardPageComponent)
  },
  {
    path: 'segmented-control',
    title: 'meta.019',
    data: {
      description: 'meta.020'
    },
    loadComponent: () =>
      import('../app/pages/segmented-control-page/segmented-control-page.component').then((c) => c.SegmentedControlPageComponent)
  },
  {
    path: 'toggle-list',
    title: 'meta.021',
    data: {
      description: 'meta.022'
    },
    loadComponent: () => import('../app/pages/toggle-list-page/toggle-list-page.component').then((c) => c.ToggleListPageComponent)
  },
  {
    path: 'badge',
    title: 'meta.023',
    data: {
      description: 'meta.024'
    },
    loadComponent: () => import('../app/pages/badge-page/badge-page.component').then((c) => c.BadgePageComponent)
  },
  {
    path: 'chip',
    title: 'meta.025',
    data: {
      description: 'meta.026'
    },
    loadComponent: () => import('../app/pages/chip-page/chip-page.component').then((c) => c.ChipPageComponent)
  },
  {
    path: 'avatar',
    title: 'meta.027',
    data: {
      description: 'meta.028'
    },
    loadComponent: () => import('../app/pages/avatar-page/avatar-page.component').then((c) => c.AvatarPageComponent)
  },
  {
    path: 'accordion',
    title: 'meta.029',
    data: {
      description: 'meta.030'
    },
    loadComponent: () => import('../app/pages/accordion-page/accordion-page.component').then((c) => c.AccordionPageComponent)
  },
  {
    path: 'tabs',
    title: 'meta.031',
    data: { description: 'meta.032' },
    loadComponent: () => import('../app/pages/tabs-page/tabs-page.component').then((c) => c.TabsPageComponent)
  },
  {
    path: 'skeleton',
    title: 'meta.033',
    data: {
      description: 'meta.034'
    },
    loadComponent: () => import('../app/pages/skeleton-page/skeleton-page.component').then((c) => c.SkeletonPageComponent)
  },
  {
    path: 'counter',
    title: 'meta.035',
    data: {
      description: 'meta.036'
    },
    loadComponent: () => import('../app/pages/counter-page/counter-page.component').then((c) => c.CounterPageComponent)
  },
  {
    path: 'ripple',
    title: 'meta.037',
    data: {
      description: 'meta.038'
    },
    loadComponent: () => import('../app/pages/ripple-page/ripple-page.component').then((c) => c.RipplePageComponent)
  },
  {
    path: 'speed-dial',
    title: 'meta.039',
    data: { description: 'meta.040' },
    loadComponent: () => import('../app/pages/speed-dial-page/speed-dial-page.component').then((c) => c.SpeedDialPageComponent)
  },
  {
    path: 'marquee',
    title: 'meta.041',
    data: {
      description: 'meta.042'
    },
    loadComponent: () => import('../app/pages/marquee-page/marquee-page.component').then((c) => c.MarqueePageComponent)
  },
  {
    path: 'modal-drawer',
    title: 'meta.043',
    data: { description: 'meta.044' },
    loadComponent: () => import('../app/pages/modal-drawer-page/modal-drawer-page.component').then((c) => c.ModalDrawerPageComponent)
  },
  {
    path: 'carousel',
    title: 'meta.045',
    data: {
      description: 'meta.046'
    },
    loadComponent: () => import('../app/pages/carousel-page/carousel-page.component').then((c) => c.CarouselPageComponent)
  },

  { path: '**', redirectTo: 'showcase' }
];
