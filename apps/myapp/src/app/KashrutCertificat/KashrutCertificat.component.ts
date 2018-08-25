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
import { KashrutCertificatService } from './KashrutCertificat.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-kashrutcertificat',
  templateUrl: './KashrutCertificat.component.html',
  styleUrls: ['./KashrutCertificat.component.css'],
  providers: [KashrutCertificatService]
})
export class KashrutCertificatComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  Cid = new FormControl('', Validators.required);
  KashrutAthhorityOwner = new FormControl('', Validators.required);
  CRTHolder = new FormControl('', Validators.required);
  CRTProduct = new FormControl('', Validators.required);
  GrantedBy = new FormControl('', Validators.required);
  GrantedTime = new FormControl('', Validators.required);
  ExpierOn = new FormControl('', Validators.required);
  STATUS = new FormControl('', Validators.required);
  CertificateConditions = new FormControl('', Validators.required);
  linkedRecords = new FormControl('', Validators.required);

  constructor(public serviceKashrutCertificat: KashrutCertificatService, fb: FormBuilder) {
    this.myForm = fb.group({
      Cid: this.Cid,
      KashrutAthhorityOwner: this.KashrutAthhorityOwner,
      CRTHolder: this.CRTHolder,
      CRTProduct: this.CRTProduct,
      GrantedBy: this.GrantedBy,
      GrantedTime: this.GrantedTime,
      ExpierOn: this.ExpierOn,
      STATUS: this.STATUS,
      CertificateConditions: this.CertificateConditions,
      linkedRecords: this.linkedRecords
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceKashrutCertificat.getAll()
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
      $class: 'org.kosher.poc.KashrutCertificat',
      'Cid': this.Cid.value,
      'KashrutAthhorityOwner': this.KashrutAthhorityOwner.value,
      'CRTHolder': this.CRTHolder.value,
      'CRTProduct': this.CRTProduct.value,
      'GrantedBy': this.GrantedBy.value,
      'GrantedTime': this.GrantedTime.value,
      'ExpierOn': this.ExpierOn.value,
      'STATUS': this.STATUS.value,
      'CertificateConditions': this.CertificateConditions.value,
      'linkedRecords': this.linkedRecords.value
    };

    this.myForm.setValue({
      'Cid': null,
      'KashrutAthhorityOwner': null,
      'CRTHolder': null,
      'CRTProduct': null,
      'GrantedBy': null,
      'GrantedTime': null,
      'ExpierOn': null,
      'STATUS': null,
      'CertificateConditions': null,
      'linkedRecords': null
    });

    return this.serviceKashrutCertificat.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'Cid': null,
        'KashrutAthhorityOwner': null,
        'CRTHolder': null,
        'CRTProduct': null,
        'GrantedBy': null,
        'GrantedTime': null,
        'ExpierOn': null,
        'STATUS': null,
        'CertificateConditions': null,
        'linkedRecords': null
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
      $class: 'org.kosher.poc.KashrutCertificat',
      'KashrutAthhorityOwner': this.KashrutAthhorityOwner.value,
      'CRTHolder': this.CRTHolder.value,
      'CRTProduct': this.CRTProduct.value,
      'GrantedBy': this.GrantedBy.value,
      'GrantedTime': this.GrantedTime.value,
      'ExpierOn': this.ExpierOn.value,
      'STATUS': this.STATUS.value,
      'CertificateConditions': this.CertificateConditions.value,
      'linkedRecords': this.linkedRecords.value
    };

    return this.serviceKashrutCertificat.updateAsset(form.get('Cid').value, this.asset)
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

    return this.serviceKashrutCertificat.deleteAsset(this.currentId)
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

    return this.serviceKashrutCertificat.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'Cid': null,
        'KashrutAthhorityOwner': null,
        'CRTHolder': null,
        'CRTProduct': null,
        'GrantedBy': null,
        'GrantedTime': null,
        'ExpierOn': null,
        'STATUS': null,
        'CertificateConditions': null,
        'linkedRecords': null
      };

      if (result.Cid) {
        formObject.Cid = result.Cid;
      } else {
        formObject.Cid = null;
      }

      if (result.KashrutAthhorityOwner) {
        formObject.KashrutAthhorityOwner = result.KashrutAthhorityOwner;
      } else {
        formObject.KashrutAthhorityOwner = null;
      }

      if (result.CRTHolder) {
        formObject.CRTHolder = result.CRTHolder;
      } else {
        formObject.CRTHolder = null;
      }

      if (result.CRTProduct) {
        formObject.CRTProduct = result.CRTProduct;
      } else {
        formObject.CRTProduct = null;
      }

      if (result.GrantedBy) {
        formObject.GrantedBy = result.GrantedBy;
      } else {
        formObject.GrantedBy = null;
      }

      if (result.GrantedTime) {
        formObject.GrantedTime = result.GrantedTime;
      } else {
        formObject.GrantedTime = null;
      }

      if (result.ExpierOn) {
        formObject.ExpierOn = result.ExpierOn;
      } else {
        formObject.ExpierOn = null;
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

      if (result.linkedRecords) {
        formObject.linkedRecords = result.linkedRecords;
      } else {
        formObject.linkedRecords = null;
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
      'Cid': null,
      'KashrutAthhorityOwner': null,
      'CRTHolder': null,
      'CRTProduct': null,
      'GrantedBy': null,
      'GrantedTime': null,
      'ExpierOn': null,
      'STATUS': null,
      'CertificateConditions': null,
      'linkedRecords': null
      });
  }

}
