import { newSpecPage } from '@stencil/core/testing';
import { SpravaKrviList } from '../sprava-krvi-list';

describe('sprava-krvi-list', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SpravaKrviList],
      html: `<sprava-krvi-list></sprava-krvi-list>`,
    });
    expect(page.root).toEqualHtml(`
      <sprava-krvi-list>
        <mock:shadow-root>
        <md-filled-select label="Filter blood type">                                                                                               
               <md-icon slot="leading-icon">                                                                                                            
                 sick                                                                                                                                   
               </md-icon>                                                                                                                               
               <md-select-option value="All">
                 <div slot="headline">
                   All
                 </div>
               </md-select-option>
               <md-select-option value="AB">
                 <div slot="headline">
                   AB
                 </div>
               </md-select-option>
               <md-select-option value="A">
                 <div slot="headline">
                   A
                 </div>
              </md-select-option>
               <md-select-option value="B">
                 <div slot="headline">
                   B
                 </div>
               </md-select-option>
              <md-select-option value="0">
                 <div slot="headline">
                   0
                 </div>
               </md-select-option>
             </md-filled-select>
             <md-filled-select label="Filter rh">
               <md-icon slot="leading-icon">
                 sick
               </md-icon>
               <md-select-option value="All">
                 <div slot="headline">
                   All
                 </div>
               </md-select-option>
               <md-select-option value="+">
                 <div slot="headline">
                   +
                 </div>
               </md-select-option>
               <md-select-option value="-">
                 <div slot="headline">
                   -
                 </div>
               </md-select-option>
             </md-filled-select>
             <md-filled-select label="Filter eligible">
               <md-icon slot="leading-icon">
                 sick
               </md-icon>
               <md-select-option value="All">
                 <div slot="headline">
                   All
                 </div>
               </md-select-option>
               <md-select-option value="True">
                 <div slot="headline">
                   True
                 </div>
               </md-select-option>
               <md-select-option value="False">
                 <div slot="headline">
                   False
                 </div>
               </md-select-option>
             </md-filled-select>
             <hr class="line-separator">
             <div class="error">
               Cannot retrieve list of waiting patients: unknown
             </div>
        </mock:shadow-root>
      </sprava-krvi-list>
    `);
  });
});
