import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { CartComponent } from './pages/cart/cart.component';
import { AdminComponent } from './pages/admin/admin.component';
import { TrocaDevolucaoComponent } from './pages/troca-devolucao/troca-devolucao.component';
import { FreteComponent } from './pages/frete/frete.component';
import { PagamentoComponent } from './pages/pagamento/pagamento.component';
import { TermosusoComponent } from './pages/termosuso/termosuso.component';
import { PerguntasComponent } from './pages/perguntas/perguntas.component';
import { SobreComponent } from './pages/sobre/sobre.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Blummy Brands' },
  { path: 'catalogo/:brand/:catalog', component: CatalogComponent, title: 'Blummy Brands' },
  { path: 'produto/:id', component: ProductDetailComponent, title: 'Blummy Brands' },
  { path: 'carrinho', component: CartComponent, title: 'Blummy Brands' },
  { path: 'admin', component: AdminComponent, title: 'Blummy Brands' },
  { path: 'troca-devolucao', component: TrocaDevolucaoComponent, title: 'Blummy Brands'},
  { path: 'termosuso', component: TermosusoComponent, title: 'Blummy Brands'},
  { path: 'frete', component: FreteComponent, title: 'Blummy Brands'},
  { path: 'pagamento', component: PagamentoComponent, title: 'Blummy Brands'},
  { path: 'perguntas', component: PerguntasComponent, title: 'Blummy Brands'},
  { path: 'sobre', component: SobreComponent, title: 'Blummy Brands'},
  { path: '**', redirectTo: '' }
];