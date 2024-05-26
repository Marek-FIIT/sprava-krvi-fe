import { newE2EPage } from '@stencil/core/testing';

describe('sprava-krvi-homepage', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <div class="actions">                                                                                                                      
    <md-filled-button id="Donors">                                                                                                           
     Darcovia                                                                                                                               
    </md-filled-button>
    <md-filled-button id="Units">
    Unity
    </md-filled-button>
    </div>
    `);
  });
});
