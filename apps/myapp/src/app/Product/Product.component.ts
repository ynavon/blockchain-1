/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ProductService } from './Product.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-product',
  templateUrl: './Product.component.html',
  styleUrls: ['./Product.component.css'],
  providers: [ProductService]
})
export class ProductComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  UniqeProductHolderID = new FormControl('', Validators.required);
  ProductDescriptorId = new FormControl('', Validators.required);
  Name = new FormControl('', Validators.required);
  BatchId = new FormControl('', Validators.required);
  description = new FormControl('', Validators.required);
  amount = new FormControl('', Validators.required);
  Parents = new FormControl('', Validators.required);
  Childrens = new FormControl('', Validators.required);
  PType = new FormControl('', Validators.required);
  owner = new FormControl('', Validators.required);
  Linkedcert = new FormControl('', Validators.required);

  constructor(public serviceProduct: ProductService, fb: FormBuilder) {
    this.myForm = fb.group({
      UniqeProductHolderID: this.UniqeProductHolderID,
      ProductDescriptorId: this.ProductDescriptorId,
      Name: this.Name,
      BatchId: this.BatchId,
      description: this.description,
      amount: this.amount,
      Parents: this.Parents,
      Childrens: this.Childrens,
      PType: this.PType,
      owner: this.owner,
      Linkedcert: this.Linkedcert
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceProduct.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.kosher.poc.Product',
      'UniqeProductHolderID': this.UniqeProductHolderID.value,
      'ProductDescriptorId': this.ProductDescriptorId.value,
      'Name': this.Name.value,
      'BatchId': this.BatchId.value,
      'description': this.description.value,
      'amount': this.amount.value,
      'Parents': this.Parents.value,
      'Childrens': this.Childrens.value,
      'PType': this.PType.value,
      'owner': this.owner.value,
      'Linkedcert': this.Linkedcert.value
    };

    this.myForm.setValue({
      'UniqeProductHolderID': null,
      'ProductDescriptorId': null,
      'Name': null,
      'BatchId': null,
      'description': null,
      'amount': null,
      'Parents': null,
      'Childrens': null,
      'PType': null,
      'owner': null,
      'Linkedcert': null
    });

    return this.serviceProduct.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'UniqeProductHolderID': null,
        'ProductDescriptorId': null,
        'Name': null,
        'BatchId': null,
        'description': null,
        'amount': null,
        'Parents': null,
        'Childrens': null,
        'PType': null,
        'owner': null,
        'Linkedcert': null
      });
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
          this.errorMessage = error;
      }
    });
  }


  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.kosher.poc.Product',
      'ProductDescriptorId': this.ProductDescriptorId.value,
      'Name': this.Name.value,
      'BatchId': this.BatchId.value,
      'description': this.description.value,
      'amount': this.amount.value,
      'Parents': this.Parents.value,
      'Childrens': this.Childrens.value,
      'PType': this.PType.value,
      'owner': this.owner.value,
      'Linkedcert': this.Linkedcert.value
    };

    return this.serviceProduct.updateAsset(form.get('UniqeProductHolderID').value, this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }


  deleteAsset(): Promise<any> {

    return this.serviceProduct.deleteAsset(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceProduct.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'UniqeProductHolderID': null,
        'ProductDescriptorId': null,
        'Name': null,
        'BatchId': null,
        'description': null,
        'amount': null,
        'Parents': null,
        'Childrens': null,
        'PType': null,
        'owner': null,
        'Linkedcert': null
      };

      if (result.UniqeProductHolderID) {
        formObject.UniqeProductHolderID = result.UniqeProductHolderID;
      } else {
        formObject.UniqeProductHolderID = null;
      }

      if (result.ProductDescriptorId) {
        formObject.ProductDescriptorId = result.ProductDescriptorId;
      } else {
        formObject.ProductDescriptorId = null;
      }

      if (result.Name) {
        formObject.Name = result.Name;
      } else {
        formObject.Name = null;
      }

      if (result.BatchId) {
        formObject.BatchId = result.BatchId;
      } else {
        formObject.BatchId = null;
      }

      if (result.description) {
        formObject.description = result.description;
      } else {
        formObject.description = null;
      }

      if (result.amount) {
        formObject.amount = result.amount;
      } else {
        formObject.amount = null;
      }

      if (result.Parents) {
        formObject.Parents = result.Parents;
      } else {
        formObject.Parents = null;
      }

      if (result.Childrens) {
        formObject.Childrens = result.Childrens;
      } else {
        formObject.Childrens = null;
      }

      if (result.PType) {
        formObject.PType = result.PType;
      } else {
        formObject.PType = null;
      }

      if (result.owner) {
        formObject.owner = result.owner;
      } else {
        formObject.owner = null;
      }

      if (result.Linkedcert) {
        formObject.Linkedcert = result.Linkedcert;
      } else {
        formObject.Linkedcert = null;
      }

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  resetForm(): void {
    this.myForm.setValue({
      'UniqeProductHolderID': null,
      'ProductDescriptorId': null,
      'Name': null,
      'BatchId': null,
      'description': null,
      'amount': null,
      'Parents': null,
      'Childrens': null,
      'PType': null,
      'owner': null,
      'Linkedcert': null
      });
  }

}
