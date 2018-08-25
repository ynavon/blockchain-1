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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Product', component: ProductComponent },
  { path: 'HistorianRecord', component: HistorianRecordComponent },
  { path: 'KashrutCertificat', component: KashrutCertificatComponent },
  { path: 'CONSUMER', component: CONSUMERComponent },
  { path: 'REGULATOR', component: REGULATORComponent },
  { path: 'Holder', component: HolderComponent },
  { path: 'KashrutMashgiach', component: KashrutMashgiachComponent },
  { path: 'Trade', component: TradeComponent },
  { path: 'MergeINTOProduct', component: MergeINTOProductComponent },
  { path: 'InvokeNewKosherCertificate', component: InvokeNewKosherCertificateComponent },
  { path: 'RevokeKosherCertificate', component: RevokeKosherCertificateComponent },
  { path: 'RevokeProductkashrut', component: RevokeProductkashrutComponent },
  { path: 'PRDQuery', component: PRDQueryComponent },
  { path: 'StartDemo2', component: StartDemo2Component },
  { path: '**', redirectTo: '' }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: []
})
export class AppRoutingModule { }
