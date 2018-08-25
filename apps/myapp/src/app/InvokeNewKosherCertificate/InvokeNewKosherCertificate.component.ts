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
import { InvokeNewKosherCertificateService } from './InvokeNewKosherCertificate.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-invokenewkoshercertificate',
  templateUrl: './InvokeNewKosherCertificate.component.html',
  styleUrls: ['./InvokeNewKosherCertificate.component.css'],
  providers: [InvokeNewKosherCertificateService]
})
export class InvokeNewKosherCertificateComponent implements OnInit {

  myForm: FormGroup;

  private allTransactions;
  private Transaction;
  private currentId;
  private errorMessage;

  GrantedBy = new FormControl('', Validators.required);
  CRTProduct = new FormControl('', Validators.required);
  TransactionTimestemp = new FormControl('', Validators.required);
  ExpieryTimestemp = new FormControl('', Validators.required);
  STATUS = new FormControl('', Validators.required);
  CertificateConditions = new FormControl('', Validators.required);
  transactionId = new FormControl('', Validators.required);
  timestamp = new FormControl('', Validators.required);


  constructor(private serviceInvokeNewKosherCertificate: InvokeNewKosherCertificateService, fb: FormBuilder) {
    this.myForm = fb.group({
      GrantedBy: this.GrantedBy,
      CRTProduct: this.CRTProduct,
      TransactionTimestemp: this.TransactionTimestemp,
      ExpieryTimestemp: this.ExpieryTimestemp,
      STATUS: this.STATUS,
      CertificateConditions: this.CertificateConditions,
      transactionId: this.transactionId,
      timestamp: this.timestamp
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceInvokeNewKosherCertificate.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(transaction => {
        tempList.push(transaction);
      });
      this.allTransactions = tempList;
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
   * @param {String} name - the name of the transaction field to update
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
   * only). This is used for checkboxes in the transaction updateDialog.
   * @param {String} name - the name of the transaction field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified transaction field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addTransaction(form: any): Promise<any> {
    this.Transaction = {
      $class: 'org.kosher.poc.InvokeNewKosherCertificate',
      'GrantedBy': this.GrantedBy.value,
      'CRTProduct': this.CRTProduct.value,
      'TransactionTimestemp': this.TransactionTimestemp.value,
      'ExpieryTimestemp': this.ExpieryTimestemp.value,
      'STATUS': this.STATUS.value,
      'CertificateConditions': this.CertificateConditions.value,
      'transactionId': this.transactionId.value,
      'timestamp': this.timestamp.value
    };

    this.myForm.setValue({
      'GrantedBy': null,
      'CRTProduct': null,
      'TransactionTimestemp': null,
      'ExpieryTimestemp': null,
      'STATUS': null,
      'CertificateConditions': null,
      'transactionId': null,
      'timestamp': null
    });

    return this.serviceInvokeNewKosherCertificate.addTransaction(this.Transaction)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'GrantedBy': null,
        'CRTProduct': null,
        'TransactionTimestemp': null,
        'ExpieryTimestemp': null,
        'STATUS': null,
        'CertificateConditions': null,
        'transactionId': null,
        'timestamp': null
      });
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
        this.errorMessage = error;
      }
    });
  }

  updateTransaction(form: any): Promise<any> {
    this.Transaction = {
      $class: 'org.kosher.poc.InvokeNewKosherCertificate',
      'GrantedBy': this.GrantedBy.value,
      'CRTProduct': this.CRTProduct.value,
      'TransactionTimestemp': this.TransactionTimestemp.value,
      'ExpieryTimestemp': this.ExpieryTimestemp.value,
      'STATUS': this.STATUS.value,
      'CertificateConditions': this.CertificateConditions.value,
      'timestamp': this.timestamp.value
    };

    return this.serviceInvokeNewKosherCertificate.updateTransaction(form.get('transactionId').value, this.Transaction)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
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

  deleteTransaction(): Promise<any> {

    return this.serviceInvokeNewKosherCertificate.deleteTransaction(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
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

    return this.serviceInvokeNewKosherCertificate.getTransaction(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'GrantedBy': null,
        'CRTProduct': null,
        'TransactionTimestemp': null,
        'ExpieryTimestemp': null,
        'STATUS': null,
        'CertificateConditions': null,
        'transactionId': null,
        'timestamp': null
      };

      if (result.GrantedBy) {
        formObject.GrantedBy = result.GrantedBy;
      } else {
        formObject.GrantedBy = null;
      }

      if (result.CRTProduct) {
        formObject.CRTProduct = result.CRTProduct;
      } else {
        formObject.CRTProduct = null;
      }

      if (result.TransactionTimestemp) {
        formObject.TransactionTimestemp = result.TransactionTimestemp;
      } else {
        formObject.TransactionTimestemp = null;
      }

      if (result.ExpieryTimestemp) {
        formObject.ExpieryTimestemp = result.ExpieryTimestemp;
      } else {
        formObject.ExpieryTimestemp = null;
      }

      if (result.STATUS) {
        formObject.STATUS = result.STATUS;
      } else {
        formObject.STATUS = null;
      }

      if (result.CertificateConditions) {
        formObject.CertificateConditions = result.CertificateConditions;
      } else {
        formObject.CertificateConditions = null;
      }

      if (result.transactionId) {
        formObject.transactionId = result.transactionId;
      } else {
        formObject.transactionId = null;
      }

      if (result.timestamp) {
        formObject.timestamp = result.timestamp;
      } else {
        formObject.timestamp = null;
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
      'GrantedBy': null,
      'CRTProduct': null,
      'TransactionTimestemp': null,
      'ExpieryTimestemp': null,
      'STATUS': null,
      'CertificateConditions': null,
      'transactionId': null,
      'timestamp': null
    });
  }
}
