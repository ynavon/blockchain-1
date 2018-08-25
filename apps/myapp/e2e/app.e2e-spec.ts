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

import { AngularTestPage } from './app.po';
import { ExpectedConditions, browser, element, by } from 'protractor';
import {} from 'jasmine';


describe('Starting tests for myapp', function() {
  let page: AngularTestPage;

  beforeEach(() => {
    page = new AngularTestPage();
  });

  it('website title should be myapp', () => {
    page.navigateTo('/');
    return browser.getTitle().then((result)=>{
      expect(result).toBe('myapp');
    })
  });

  it('network-name should be regulatornetwork@0.0.1',() => {
    element(by.css('.network-name')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('regulatornetwork@0.0.1.bna');
    });
  });

  it('navbar-brand should be myapp',() => {
    element(by.css('.navbar-brand')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('myapp');
    });
  });

  
    it('Product component should be loadable',() => {
      page.navigateTo('/Product');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Product');
      });
    });

    it('Product table should have 12 columns',() => {
      page.navigateTo('/Product');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(12); // Addition of 1 for 'Action' column
      });
    });
  
    it('HistorianRecord component should be loadable',() => {
      page.navigateTo('/HistorianRecord');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('HistorianRecord');
      });
    });

    it('HistorianRecord table should have 8 columns',() => {
      page.navigateTo('/HistorianRecord');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(8); // Addition of 1 for 'Action' column
      });
    });
  
    it('KashrutCertificat component should be loadable',() => {
      page.navigateTo('/KashrutCertificat');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('KashrutCertificat');
      });
    });

    it('KashrutCertificat table should have 11 columns',() => {
      page.navigateTo('/KashrutCertificat');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(11); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('CONSUMER component should be loadable',() => {
      page.navigateTo('/CONSUMER');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('CONSUMER');
      });
    });

    it('CONSUMER table should have 2 columns',() => {
      page.navigateTo('/CONSUMER');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(2); // Addition of 1 for 'Action' column
      });
    });
  
    it('REGULATOR component should be loadable',() => {
      page.navigateTo('/REGULATOR');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('REGULATOR');
      });
    });

    it('REGULATOR table should have 4 columns',() => {
      page.navigateTo('/REGULATOR');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(4); // Addition of 1 for 'Action' column
      });
    });
  
    it('Holder component should be loadable',() => {
      page.navigateTo('/Holder');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Holder');
      });
    });

    it('Holder table should have 5 columns',() => {
      page.navigateTo('/Holder');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(5); // Addition of 1 for 'Action' column
      });
    });
  
    it('KashrutMashgiach component should be loadable',() => {
      page.navigateTo('/KashrutMashgiach');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('KashrutMashgiach');
      });
    });

    it('KashrutMashgiach table should have 6 columns',() => {
      page.navigateTo('/KashrutMashgiach');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(6); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('Trade component should be loadable',() => {
      page.navigateTo('/Trade');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Trade');
      });
    });
  
    it('MergeINTOProduct component should be loadable',() => {
      page.navigateTo('/MergeINTOProduct');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('MergeINTOProduct');
      });
    });
  
    it('InvokeNewKosherCertificate component should be loadable',() => {
      page.navigateTo('/InvokeNewKosherCertificate');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('InvokeNewKosherCertificate');
      });
    });
  
    it('RevokeKosherCertificate component should be loadable',() => {
      page.navigateTo('/RevokeKosherCertificate');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('RevokeKosherCertificate');
      });
    });
  
    it('RevokeProductkashrut component should be loadable',() => {
      page.navigateTo('/RevokeProductkashrut');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('RevokeProductkashrut');
      });
    });
  
    it('PRDQuery component should be loadable',() => {
      page.navigateTo('/PRDQuery');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('PRDQuery');
      });
    });
  
    it('StartDemo2 component should be loadable',() => {
      page.navigateTo('/StartDemo2');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('StartDemo2');
      });
    });
  

});