import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, NgIf } from '@angular/common';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, NgIf],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;

  useFallbackImage(event: Event): void {
    const image = event.target as HTMLImageElement;
    image.onerror = null;
    image.src = 'assets/catalogs/esmeral/basic/39746.jpg';
  }
}
