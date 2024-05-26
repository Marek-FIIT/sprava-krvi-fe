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
        <div class="actions">                                                                                                                      
               <md-filled-button id="Donors">                                                                                                           
                Darcovia                                                                                                                               
              </md-filled-button>                                                                                                                      
              <md-filled-button id="Units">
                Unity
              </md-filled-button>
        </mock:shadow-root>
      </sprava-krvi-homepage>
    `);
  });
});
