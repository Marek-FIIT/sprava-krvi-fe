import { newE2EPage } from '@stencil/core/testing';

describe('sprava-krvi-homepage', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <div class="container">                                                                                                                              
    <h1>                                                                                                                                               
      <span style="color: red;">                                                                                                                       
        Sprav                                                                                                                                          
      </span>
      <span style="color: black;">
        Krv
      </span>
    </h1>
    <p>
      Efektívny systém pre manažment darcov a ich jednotiek krvi, pre jednoduchý prehľad a modifikáciu týchto dát.
    </p>                                                                                                                      
    <md-filled-button  class="button" id="Donors">                                                                                                           
     Darcovia                                                                                                                               
    </md-filled-button>
    <md-filled-button  class="button" id="Units">
    Krvné jednotky
    </md-filled-button>
    </div>
    `);
  });
});
