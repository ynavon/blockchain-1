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

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { DataService } from './data.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { ProductComponent } from './Product/Product.component';
import { HistorianRecordComponent } from './HistorianRecord/HistorianRecord.component';
import { KashrutCertificatComponent } from './KashrutCertificat/KashrutCertificat.component';

import { CONSUMERComponent } from './CONSUMER/CONSUMER.component';
import { REGULATORComponent } from './REGULATOR/REGULATOR.component';
import { HolderComponent } from './Holder/Holder.component';
import { KashrutMashgiachComponent } from './KashrutMashgiach/KashrutMashgiach.component';

import { TradeComponent } from './Trade/Trade.component';
import { MergeINTOProductComponent } from './MergeINTOProduct/MergeINTOProduct.component';
import { InvokeNewKosherCertificateComponent } from './InvokeNewKosherCertificate/InvokeNewKosherCertificate.component';
import { RevokeKosherCertificateComponent } from './RevokeKosherCertificate/RevokeKosherCertificate.component';
import { RevokeProductkashrutComponent } from './RevokeProductkashrut/RevokeProductkashrut.component';
import { PRDQueryComponent } from './PRDQuery/PRDQuery.component';
import { StartDemo2Component } from './StartDemo2/StartDemo2.component';

  @NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductComponent,
    HistorianRecordComponent,
    KashrutCertificatComponent,
    CONSUMERComponent,
    REGULATORComponent,
    HolderComponent,
    KashrutMashgiachComponent,
    TradeComponent,
    MergeINTOProductComponent,
    InvokeNewKosherCertificateComponent,
    RevokeKosherCertificateComponent,
    RevokeProductkashrutComponent,
    PRDQueryComponent,
    StartDemo2Component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
