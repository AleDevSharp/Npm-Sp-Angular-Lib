// --------------------------------------------------------------
// Project: SpLib
// File name: sp-carousel.component.spec.ts
// File description: Unit tests for the SpCarouselComponent and SpCarouselSlideComponent.
// Author: Alessio Giacché
// Date created: 11-11-2026
// License: MIT
// --------------------------------------------------------------

import { Component } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { SpCarouselComponent } from './sp-carousel.component';
import { SpCarouselItem } from './sp-carousel.types';
import { SpCarouselSlideComponent } from './sp-carousel-slide.component';

@Component({
  standalone: true,
  imports: [SpCarouselComponent, SpCarouselSlideComponent],
  template: `
    <sp-carousel
      [(activeIndex)]="currentIndex"
      [items]="galleryItems"
      [loop]="isLoop"
      [autoplay]="isAutoplay"
      [interval]="1000"
      [indicatorType]="indicatorType"
      (slideChange)="onSlideChange($event)">
      @if (useCustomSlides) {
        <sp-carousel-slide ariaLabel="Custom Slide 1">
          <div class="custom-card">Custom Slide 1</div>
        </sp-carousel-slide>
        <sp-carousel-slide ariaLabel="Custom Slide 2">
          <div class="custom-card">Custom Slide 2</div>
        </sp-carousel-slide>
      }
    </sp-carousel>
  `
})
class TestCarouselHostComponent {
  public currentIndex = 0;
  public isLoop = true;
  public isAutoplay = false;
  public indicatorType: any = 'bars';
  public useCustomSlides = false;
  public lastChangedIndex = -1;

  public galleryItems: SpCarouselItem[] = [
    { title: 'Slide Alpha', description: 'Descrizione Alpha' },
    { title: 'Slide Beta', description: 'Descrizione Beta' },
    { title: 'Slide Gamma', description: 'Descrizione Gamma' }
  ];

  public onSlideChange(idx: number): void {
    this.lastChangedIndex = idx;
  }
}

describe('SpCarouselComponent', () => {
  let fixture: ComponentFixture<TestCarouselHostComponent>;
  let host: TestCarouselHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestCarouselHostComponent, SpCarouselComponent, SpCarouselSlideComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestCarouselHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize with activeIndex at 0', () => {
    expect(host.currentIndex).toBe(0);
  });

  it('should render items slides from data array', () => {
    const slides = fixture.nativeElement.querySelectorAll('.sp-carousel-item-slide');
    expect(slides.length).toBe(3);

    const firstTitle = fixture.nativeElement.querySelector('.sp-carousel-caption-title');
    expect(firstTitle?.textContent?.trim()).toBe('Slide Alpha');
  });

  it('should advance to the next slide when clicking the next arrow', () => {
    const nextBtn = fixture.nativeElement.querySelector('.sp-carousel-arrow-next');
    nextBtn.click();
    fixture.detectChanges();

    expect(host.currentIndex).toBe(1);
    expect(host.lastChangedIndex).toBe(1);
  });

  it('should navigate to the previous slide when clicking the prev arrow', () => {
    host.currentIndex = 1;
    fixture.detectChanges();

    const prevBtn = fixture.nativeElement.querySelector('.sp-carousel-arrow-prev');
    prevBtn.click();
    fixture.detectChanges();

    expect(host.currentIndex).toBe(0);
  });

  it('should loop around to the last slide when clicking prev from first slide if loop is true', () => {
    host.currentIndex = 0;
    host.isLoop = true;
    fixture.detectChanges();

    const prevBtn = fixture.nativeElement.querySelector('.sp-carousel-arrow-prev');
    prevBtn.click();
    fixture.detectChanges();

    expect(host.currentIndex).toBe(2);
  });

  it('should navigate to corresponding slide when clicking an indicator button', () => {
    const indicatorBtns = fixture.nativeElement.querySelectorAll('.sp-carousel-indicator-bar-btn');
    expect(indicatorBtns.length).toBe(3);

    indicatorBtns[2].click();
    fixture.detectChanges();

    expect(host.currentIndex).toBe(2);
  });

  it('should handle keyboard ArrowRight and ArrowLeft', () => {
    const carouselEl = fixture.nativeElement.querySelector('sp-carousel');

    const rightEvent = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true });
    carouselEl.dispatchEvent(rightEvent);
    fixture.detectChanges();
    expect(host.currentIndex).toBe(1);

    const leftEvent = new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true });
    carouselEl.dispatchEvent(leftEvent);
    fixture.detectChanges();
    expect(host.currentIndex).toBe(0);
  });

  it('should advance automatically with autoplay after interval', fakeAsync(() => {
    host.isAutoplay = true;
    fixture.detectChanges();

    tick(1100);
    fixture.detectChanges();

    expect(host.currentIndex).toBe(1);
  }));
});
