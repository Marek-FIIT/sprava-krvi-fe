import { newSpecPage } from '@stencil/core/testing';
import { SpravaKrviHomepage } from '../sprava-krvi-homepage';

describe('sprava-krvi-homepage', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SpravaKrviHomepage],
      html: `<sprava-krvi-homepage></sprava-krvi-homepage>`,
    });
    expect(page.root).toEqualHtml(`
      <sprava-krvi-homepage>
        <mock:shadow-root>
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
        </mock:shadow-root>
      </sprava-krvi-homepage>
    `);
  });
});
