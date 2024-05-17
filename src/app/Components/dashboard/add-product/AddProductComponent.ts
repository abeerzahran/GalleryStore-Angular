import { ProductServicesService } from './../../../Services/product-services.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';



@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [Validators.required, Validators.minLength(3)]),
    price: new FormControl(90, [Validators.required, Validators.min(90)]),
    quantity: new FormControl(0, [Validators.required, Validators.min(0)]),
    rate: new FormControl(0, [Validators.required, Validators.min(0),Validators.max(5)]),
    img: new FormControl(''),
    categoryID: new FormControl(0, [Validators.required, Validators.min(0)]),
  });

  get getName() {
    return this.form.controls['name'];
  }
  get getdescription() {
    return this.form.controls['description'];
  }
  get getprice() {
    return this.form.controls['price'];
  }
  get getquantity() {
    return this.form.controls['quantity'];
  }
  get getrate() {
    return this.form.controls['rate'];
  }
  get getimg() {
    return this.form.controls['img'];
  }
  get getcategory() {
    return this.form.controls['categoryID'];
  }

  product: any;
  productID: number = 0;
  constructor(public productserv: ProductServicesService, public activatedroute: ActivatedRoute, public route: Router) {
    this.product = {};
  }
  ngOnInit(): void {
    // this.productID=this.activatedroute.snapshot.params['id'];
    this.activatedroute.params.subscribe({
      next: (params) => {
        this.productID = params['id'];
        this.getName.setValue('');
        this.getdescription.setValue('');
        this.getprice.setValue(null);
        this.getquantity.setValue(null);
        this.getrate.setValue(null);
        // this.getimg.setValue(null);
        this.getcategory.setValue(null);
      }
    });
    if (this.productID != 0) {
      let existproduct: any;
      this.productserv.getProductByID(this.productID).subscribe({
        next: (data) => {

          this.product = data;
          // this.product=this.product[0]
          this.getName.setValue(this.product.name);
          this.getdescription.setValue(this.product.description);
          this.getprice.setValue(this.product.price);
          this.getquantity.setValue(this.product.quantity);
          this.getrate.setValue(this.product.rate);
          this.getimg.setValue(this.product.img);
          this.getcategory.setValue(this.product.categoryID);
        }
      });

    }
  }





  productHandler() {

    if (this.productID == 0) {

      this.productserv.getAllProducts().subscribe({
        next: (data) => {

          this.productID = data.length + 1;
        }
      });




      console.log(this.product);
      this.productserv.addProduct(this.form.value).subscribe({
        next: () => {
          this.route.navigate(['/dashboard']);
        }
      });

    }

    else {
      console.log(this.form.value);
      var product={

          id:Number(this.productID),
          name: this.form.value.name ,
          description: this.form.value.description,
          price: this.form.value.price,
          quantity: this.form.value.quantity,
          rate: this.form.value.rate,
          img: this.imageUrl,
          categoryID: this.form.value.categoryID

      }
      this.productserv.editProduct(this.productID, product).subscribe({
        next: () => {
          this.route.navigate(['/dashboard']);
        }
      });

    }


  }

  imageUrl: string | ArrayBuffer | null = null;

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageUrl = reader.result;
        this.form.value.img=String(this.imageUrl);
        console.log(this.imageUrl);
      };
    }
  }


}
