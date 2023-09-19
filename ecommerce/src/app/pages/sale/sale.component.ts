import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss'],
})
export class SaleComponent implements OnInit {
  cartProducts: any[] = [];
  subTotal: number = 0;

  ngOnInit(): void {
    this.loadCart();
  }
  saleObj: any =  {
    "SaleId": 0,
    "CustId": 1,
    "SaleDate": new Date(),
    "TotalInvoiceAmount": 0,
    "Discount": 0,
    "PaymentNaration": "Patmm ",
    "DeliveryAddress1": "Plot nio 122",
    "DeliveryAddress2": "Ner ATM",
    "DeliveryCity": "Pune",
    "DeliveryPinCode": "440033",
    "DeliveryLandMark": "ATM"
};

  constructor(private productServic: ProductsService) {}
  loadCart() {
    this.productServic.getCartItemByCustId(1).subscribe((res: any) => {
      this.cartProducts = res.data;
      this.cartProducts.forEach((element) => {
        this.subTotal = this.subTotal + element.productPrice;
      });
    });
  }
  RemoveItem(id: number) {
    this.productServic.removeCartItemById(id).subscribe((res: any) => {
      if (res.result) {
        this.loadCart();
        this.productServic.cartAddedSubject.next(true);
        window.location.reload();
        // this._diaglogRef.close(true);
      }
    });
  }
  makeSale() {
    this.saleObj.TotalInvoiceAmount = this.subTotal;
    this.productServic.cartAddedSubject.next(true);
    this.productServic.makeSale( this.saleObj).subscribe((res: any) => {
      if (res.result) {
        alert("Sale Success")
        this.loadCart();
        this.productServic.cartAddedSubject.next(true);
      }
    })
  }
}
