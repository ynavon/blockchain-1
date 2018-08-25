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
import { HistorianRecordService } from './HistorianRecord.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-historianrecord',
  templateUrl: './HistorianRecord.component.html',
  styleUrls: ['./HistorianRecord.component.css'],
  providers: [HistorianRecordService]
})
export class HistorianRecordComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  transactionId = new FormControl('', Validators.required);
  FromOwner = new FormControl('', Validators.required);
  ToOwner = new FormControl('', Validators.required);
  commodity = new FormControl('', Validators.required);
  TransferedAmount = new FormControl('', Validators.required);
  BatchId = new FormControl('', Validators.required);
  ProductKashrutStatus = new FormControl('', Validators.required);

  constructor(public serviceHistorianRecord: HistorianRecordService, fb: FormBuilder) {
    this.myForm = fb.group({
      transactionId: this.transactionId,
      FromOwner: this.FromOwner,
      ToOwner: this.ToOwner,
      commodity: this.commodity,
      TransferedAmount: this.TransferedAmount,
      BatchId: this.BatchId,
      ProductKashrutStatus: this.ProductKashrutStatus
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceHistorianRecord.getAll()
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
      $class: 'org.kosher.poc.HistorianRecord',
      'transactionId': this.transactionId.value,
      'FromOwner': this.FromOwner.value,
      'ToOwner': this.ToOwner.value,
      'commodity': this.commodity.value,
      'TransferedAmount': this.TransferedAmount.value,
      'BatchId': this.BatchId.value,
      'ProductKashrutStatus': this.ProductKashrutStatus.value
    };

    this.myForm.setValue({
      'transactionId': null,
      'FromOwner': null,
      'ToOwner': null,
      'commodity': null,
      'TransferedAmount': null,
      'BatchId': null,
      'ProductKashrutStatus': null
    });

    return this.serviceHistorianRecord.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'transactionId': null,
        'FromOwner': null,
        'ToOwner': null,
        'commodity': null,
        'TransferedAmount': null,
        'BatchId': null,
        'ProductKashrutStatus': null
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
      $class: 'org.kosher.poc.HistorianRecord',
      'FromOwner': this.FromOwner.value,
      'ToOwner': this.ToOwner.value,
      'commodity': this.commodity.value,
      'TransferedAmount': this.TransferedAmount.value,
      'BatchId': this.BatchId.value,
      'ProductKashrutStatus': this.ProductKashrutStatus.value
    };

    return this.serviceHistorianRecord.updateAsset(form.get('transactionId').value, this.asset)
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

    return this.serviceHistorianRecord.deleteAsset(this.currentId)
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

    return this.serviceHistorianRecord.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'transactionId': null,
        'FromOwner': null,
        'ToOwner': null,
        'commodity': null,
        'TransferedAmount': null,
        'BatchId': null,
        'ProductKashrutStatus': null
      };

      if (result.transactionId) {
        formObject.transactionId = result.transactionId;
      } else {
        formObject.transactionId = null;
      }

      if (result.FromOwner) {
        formObject.FromOwner = result.FromOwner;
      } else {
        formObject.FromOwner = null;
      }

      if (result.ToOwner) {
        formObject.ToOwner = result.ToOwner;
      } else {
        formObject.ToOwner = null;
      }

      if (result.commodity) {
        formObject.commodity = result.commodity;
      } else {
        formObject.commodity = null;
      }

      if (result.TransferedAmount) {
        formObject.TransferedAmount = result.TransferedAmount;
      } else {
        formObject.TransferedAmount = null;
      }

      if (result.BatchId) {
        formObject.BatchId = result.BatchId;
      } else {
        formObject.BatchId = null;
      }

      if (result.ProductKashrutStatus) {
        formObject.ProductKashrutStatus = result.ProductKashrutStatus;
      } else {
        formObject.ProductKashrutStatus = null;
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
      'transactionId': null,
      'FromOwner': null,
      'ToOwner': null,
      'commodity': null,
      'TransferedAmount': null,
      'BatchId': null,
      'ProductKashrutStatus': null
      });
  }

}
