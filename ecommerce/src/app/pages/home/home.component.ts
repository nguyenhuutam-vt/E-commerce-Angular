import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  //kho de luu tru du lieu va de ben html call *ngFor="let product of productList"
  productList: any[] = [];

  //bien obj de post
  cartObj: any = {
    CartId: 0,
    CustId: 1,
    ProductId: 0,
    Quantity: 0,
    AddedDate: '2023-09-19T03:32:02.967Z',
  };

  //tro toi cho de lay api
  constructor(private productService: ProductsService) {}

  //return de tra lai du lieu
  ngOnInit(): void {
    this.loadProduct();
  }

  //get api ra
  loadProduct() {
    this.productService.getAllProducts().subscribe((result: any) => {
      this.productList = result.data;
      console.log(result.data);
    });
  }

  //add
  addItemCart(productId: number) {
    // debugger;
    this.cartObj.ProductId = productId;
    this.productService.addToCart(this.cartObj).subscribe((result: any) => {
      if (result.result) {
        alert('Product Added To Cart');
        // this.productService.cartAddedSubject.next(true);
        window.location.reload();
      }
    });
  }
}
