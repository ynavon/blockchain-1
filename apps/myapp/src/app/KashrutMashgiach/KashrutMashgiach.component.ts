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
import { KashrutMashgiachService } from './KashrutMashgiach.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-kashrutmashgiach',
  templateUrl: './KashrutMashgiach.component.html',
  styleUrls: ['./KashrutMashgiach.component.css'],
  providers: [KashrutMashgiachService]
})
export class KashrutMashgiachComponent implements OnInit {

  myForm: FormGroup;

  private allParticipants;
  private participant;
  private currentId;
  private errorMessage;

  KashrutAthhorityOwner = new FormControl('', Validators.required);
  HashgachaName = new FormControl('', Validators.required);
  HashgachaId = new FormControl('', Validators.required);
  SignitoryNominationGrantedTime = new FormControl('', Validators.required);
  SignitoryExpierOn = new FormControl('', Validators.required);


  constructor(public serviceKashrutMashgiach: KashrutMashgiachService, fb: FormBuilder) {
    this.myForm = fb.group({
      KashrutAthhorityOwner: this.KashrutAthhorityOwner,
      HashgachaName: this.HashgachaName,
      HashgachaId: this.HashgachaId,
      SignitoryNominationGrantedTime: this.SignitoryNominationGrantedTime,
      SignitoryExpierOn: this.SignitoryExpierOn
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceKashrutMashgiach.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(participant => {
        tempList.push(participant);
      });
      this.allParticipants = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the participant field to update
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
   * only). This is used for checkboxes in the participant updateDialog.
   * @param {String} name - the name of the participant field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified participant field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addParticipant(form: any): Promise<any> {
    this.participant = {
      $class: 'org.kosher.poc.KashrutMashgiach',
      'KashrutAthhorityOwner': this.KashrutAthhorityOwner.value,
      'HashgachaName': this.HashgachaName.value,
      'HashgachaId': this.HashgachaId.value,
      'SignitoryNominationGrantedTime': this.SignitoryNominationGrantedTime.value,
      'SignitoryExpierOn': this.SignitoryExpierOn.value
    };

    this.myForm.setValue({
      'KashrutAthhorityOwner': null,
      'HashgachaName': null,
      'HashgachaId': null,
      'SignitoryNominationGrantedTime': null,
      'SignitoryExpierOn': null
    });

    return this.serviceKashrutMashgiach.addParticipant(this.participant)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'KashrutAthhorityOwner': null,
        'HashgachaName': null,
        'HashgachaId': null,
        'SignitoryNominationGrantedTime': null,
        'SignitoryExpierOn': null
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


   updateParticipant(form: any): Promise<any> {
    this.participant = {
      $class: 'org.kosher.poc.KashrutMashgiach',
      'KashrutAthhorityOwner': this.KashrutAthhorityOwner.value,
      'HashgachaName': this.HashgachaName.value,
      'SignitoryNominationGrantedTime': this.SignitoryNominationGrantedTime.value,
      'SignitoryExpierOn': this.SignitoryExpierOn.value
    };

    return this.serviceKashrutMashgiach.updateParticipant(form.get('HashgachaId').value, this.participant)
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


  deleteParticipant(): Promise<any> {

    return this.serviceKashrutMashgiach.deleteParticipant(this.currentId)
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

    return this.serviceKashrutMashgiach.getparticipant(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'KashrutAthhorityOwner': null,
        'HashgachaName': null,
        'HashgachaId': null,
        'SignitoryNominationGrantedTime': null,
        'SignitoryExpierOn': null
      };

      if (result.KashrutAthhorityOwner) {
        formObject.KashrutAthhorityOwner = result.KashrutAthhorityOwner;
      } else {
        formObject.KashrutAthhorityOwner = null;
      }

      if (result.HashgachaName) {
        formObject.HashgachaName = result.HashgachaName;
      } else {
        formObject.HashgachaName = null;
      }

      if (result.HashgachaId) {
        formObject.HashgachaId = result.HashgachaId;
      } else {
        formObject.HashgachaId = null;
      }

      if (result.SignitoryNominationGrantedTime) {
        formObject.SignitoryNominationGrantedTime = result.SignitoryNominationGrantedTime;
      } else {
        formObject.SignitoryNominationGrantedTime = null;
      }

      if (result.SignitoryExpierOn) {
        formObject.SignitoryExpierOn = result.SignitoryExpierOn;
      } else {
        formObject.SignitoryExpierOn = null;
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
      'KashrutAthhorityOwner': null,
      'HashgachaName': null,
      'HashgachaId': null,
      'SignitoryNominationGrantedTime': null,
      'SignitoryExpierOn': null
    });
  }
}
