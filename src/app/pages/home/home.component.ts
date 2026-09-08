import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { CatalogItem, CatalogService } from '../../services/catalog.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

interface HomeBrand {
  name: string;
  catalogs: string[];
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, RouterLink, ProductCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild('productTrack') productTrack?: ElementRef<HTMLDivElement>;

  featuredProducts: Product[] = [];
  activeSlide = 0;
  activeAccordion: string | null = null;
  brands: HomeBrand[] = [];

  readonly slides = [
    {
      desktopImage: 'assets/annefernandes/theannfclub/TP3002-1.jpg',
      mobileImage: 'assets/annefernandes/theannfclub/TP3002-1.jpg',
      alt: 'Blumy Brands - Esmeral Basic',
      link: '/catalogo/Esmeral/Basic'
    },
    {
      desktopImage: 'assets/zen/catalogo1/51388-1.jpg',
      mobileImage: 'assets/zen/catalogo1/51388-1.jpg',
      alt: 'Blumy Brands - Esmeral Basic',
      link: '/catalogo/Esmeral/Basic'
    },
    {
      desktopImage: 'assets/uzee-couro/156-1.jpg',
      mobileImage: 'assets/uzee-couro/156-1.jpg',
      alt: 'Blumy Brands - Esmeral Basic',
      link: '/catalogo/Esmeral/Basic'
    }
  ];

  private readonly heroImages = [
    'assets/annefernandes/theannfclub/SP1055-1.jpg',
    'assets/annefernandes/theannfclub/TP1013-1.jpg',
    'assets/annefernandes/theannfclub/TP2020-1.jpg',
    'assets/annefernandes/theannfclub/TP4012-1.jpg',
    'assets/annefernandes/theannfclub/TP1064-1.jpg',
    'assets/annefernandes/theannfclub/TPJR9006-1.jpg',
    'assets/annefernandes/theannfclub/TPJR9006-2.jpg'
  ];

  readonly heroSlides = [...this.heroImages, ...this.heroImages];

  private intervalId: number | undefined;
  private catalogSubscription?: Subscription;

  constructor(
    private readonly productService: ProductService,
    private readonly catalogService: CatalogService
  ) {}

  ngOnInit(): void {
    this.featuredProducts = this.productService
      .getProducts()
      .filter(product =>
        product.brand?.trim().toLowerCase() === 'uzee' &&
        product.catalog?.trim().toLowerCase() === 'inverno 26' &&
        product.isActive
      )
      .slice(0, 8);

    this.catalogSubscription = this.catalogService.catalogs$.subscribe((catalogs: CatalogItem[]) => {
      this.brands = this.groupCatalogsByBrand(catalogs);

      if (
        this.activeAccordion &&
        !this.brands.some(brand => brand.name === this.activeAccordion)
      ) {
        this.activeAccordion = null;
      }
    });

    this.startCarousel();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      window.clearInterval(this.intervalId);
    }

    this.catalogSubscription?.unsubscribe();
  }

  goToSlide(index: number): void {
    this.activeSlide = index;
  }

  scrollProducts(direction: 'prev' | 'next'): void {
    const track = this.productTrack?.nativeElement;

    if (!track) {
      return;
    }

    const firstCard = track.querySelector('app-product-card') as HTMLElement | null;
    const gap = Number.parseInt(window.getComputedStyle(track).gap || '25', 10) || 25;
    const scrollAmount = (firstCard?.offsetWidth ?? 280) + gap;

    track.scrollBy({
      left: direction === 'next' ? scrollAmount : -scrollAmount,
      behavior: 'smooth'
    });
  }

  toggleAccordion(key: string): void {
    this.activeAccordion = this.activeAccordion === key ? null : key;
  }

  trackByProductId(_: number, product: Product): number {
    return product.id;
  }

  trackByHeroImage(index: number, image: string): string {
    return `${image}-${index}`;
  }

  trackByBrand(_: number, brand: HomeBrand): string {
    return brand.name;
  }

  trackByCatalog(_: number, catalog: string): string {
    return catalog;
  }

  private groupCatalogsByBrand(catalogs: CatalogItem[]): HomeBrand[] {
    const brandsMap = new Map<string, Set<string>>();

    catalogs.forEach(item => {
      const brandName = item.brand.trim();
      const catalogName = item.catalog.trim();

      if (!brandName || !catalogName) {
        return;
      }

      if (!brandsMap.has(brandName)) {
        brandsMap.set(brandName, new Set<string>());
      }

      brandsMap.get(brandName)?.add(catalogName);
    });

    return Array.from(brandsMap.entries())
      .map(([name, catalogsSet]) => ({
        name,
        catalogs: Array.from(catalogsSet).sort((a, b) =>
          a.localeCompare(b, 'pt-BR', { sensitivity: 'base' })
        )
      }))
      .sort((a, b) =>
        a.name.localeCompare(b.name, 'pt-BR', { sensitivity: 'base' })
      );
  }

  private startCarousel(): void {
    this.intervalId = window.setInterval(() => {
      this.activeSlide = (this.activeSlide + 1) % this.slides.length;
    }, 4500);
  }
}
