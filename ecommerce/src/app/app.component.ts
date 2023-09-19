import { Component, OnInit } from '@angular/core';
import { ProductsService } from './services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ecommerce';

  subTotal: number = 0;

  //mang
  cartProducts: any[] = [];

  constructor(private productService: ProductsService, private router: Router) {
    // this.productService.cartAddedSubject.subscribe((res) => {});
    //khi dung 1 hd nao do can reload lai , update tai trang do
    this.loadCart();
  }
  ngOnInit(): void {
    this.loadCart();
  }
  loadCart() {
    this.productService.getCartItemByCustId(1).subscribe((res: any) => {
      this.cartProducts = res.data;
      this.cartProducts.forEach((element) => {
        this.subTotal = this.subTotal + element.productPrice;
      });
    });
  }
  redirectToSale() {
    this.router.navigateByUrl('/sale');
  }
}
