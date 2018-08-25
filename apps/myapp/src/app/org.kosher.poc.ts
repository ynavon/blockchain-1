import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.kosher.poc{
   export class CONSUMER extends Participant {
      CONSUMERId: string;
   }
   export class REGULATOR extends Participant {
      REGULATORId: string;
      REGULATORName: string;
      REGULATORaddress: string;
   }
   export class Holder extends Participant {
      HolderId: string;
      HolderName: string;
      HolderType: HolderType;
      address: string;
   }
   export class KashrutMashgiach extends Participant {
      KashrutAthhorityOwner: REGULATOR;
      HashgachaName: string;
      HashgachaId: string;
      SignitoryNominationGrantedTime: Date;
      SignitoryExpierOn: Date;
   }
   export class Product extends Asset {
      UniqeProductHolderID: string;
      ProductDescriptorId: string;
      Name: string;
      BatchId: string;
      description: string;
      amount: number;
      Parents: Product[];
      Childrens: Product[];
      PType: ProductType;
      owner: Holder;
      Linkedcert: KashrutCertificat;
   }
   export class Trade extends Transaction {
      commodity: Product;
      TransferedAmount: number;
      TransactionTimestemp: Date;
      newOwner: Holder;
   }
   export class MergeINTOProduct extends Transaction {
      commodity: Product[];
      NewProductDetails: Product;
      TransactionTimestemp: Date;
   }
   export enum ProductType {
      DAIRY,
      BEEF,
      PARVE,
   }
   export enum HolderType {
      PRODUCER,
      SUPLIER,
      RETAILER,
      BRAND,
      CONSUMER,
      TRANSPORTAGENT,
   }
   export class HistorianRecord extends Asset {
      transactionId: string;
      FromOwner: Holder[];
      ToOwner: Holder;
      commodity: Product[];
      TransferedAmount: number;
      BatchId: string;
      ProductKashrutStatus: string;
   }
   export class KashrutCertificat extends Asset {
      Cid: string;
      KashrutAthhorityOwner: REGULATOR;
      CRTHolder: Holder;
      CRTProduct: Product;
      GrantedBy: KashrutMashgiach;
      GrantedTime: Date;
      ExpierOn: Date;
      STATUS: CertificateStatus;
      CertificateConditions: string;
      linkedRecords: HistorianRecord[];
   }
   export enum CertificateStatus {
      VALID,
      EXPIERED,
      REVOKE,
      PENDING,
   }
   export class InvokeNewKosherCertificate extends Transaction {
      GrantedBy: KashrutMashgiach;
      CRTProduct: Product;
      TransactionTimestemp: Date;
      ExpieryTimestemp: Date;
      STATUS: CertificateStatus;
      CertificateConditions: string;
   }
   export class RevokeKosherCertificate extends Transaction {
      CertToRevoke: KashrutCertificat;
      TransactionTimestemp: Date;
   }
   export class RevokeProductkashrut extends Transaction {
   }
   export class PRDQuery extends Transaction {
   }
   export class BasicEvent extends Event {
   }
   export class StartDemo2 extends Transaction {
   }
// }
