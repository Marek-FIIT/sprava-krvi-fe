import { newE2EPage } from '@stencil/core/testing';

describe('sprava-krvi-uniteditor', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `
    <form>                                                                                                                                     
    <md-filled-text-field label="ID" readonly="">                                                                                            
      <md-icon slot="leading-icon">                                                                                                          
        person                                                                                                                               
      </md-icon>
    </md-filled-text-field>
    <md-filled-text-field label="Darcove ID" readonly="" required="">
      <md-icon slot="leading-icon">
        person
      </md-icon>
    </md-filled-text-field>
    <md-filled-text-field label="ID darovania" readonly="">
      <md-icon slot="leading-icon">
        fingerprint
      </md-icon>
    </md-filled-text-field>
    <md-filled-select label="Typ krvi">
      <md-icon slot="leading-icon">
        sick
      </md-icon>
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
    <md-filled-select label="RH Faktor">
      <md-icon slot="leading-icon">
       sick
      </md-icon>
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
    <md-filled-select label="Status">
      <md-icon slot="leading-icon">
        sick
      </md-icon>
      <md-select-option value="available">
        <div slot="headline">
          available
        </div>
      </md-select-option>
      <md-select-option value="reserved">
        <div slot="headline">
          reserved
        </div>
      </md-select-option>
      <md-select-option value="unprocessed">
        <div slot="headline">
          unprocessed
        </div>
      </md-select-option>
      <md-select-option value="suspended">
        <div slot="headline">
        suspended
        </div>
      </md-select-option>
      <md-select-option value="contaminated">
        <div slot="headline">
         contaminated
        </div>
      </md-select-option>
      <md-select-option value="expired">
      <div slot="headline">
          expired
        </div>
      </md-select-option>
    </md-filled-select>
    <md-filled-text-field label="Lokacia" required="">
      <md-icon slot="leading-icon">
        fingerprint
      </md-icon>
   </md-filled-text-field>
    <mwc-formfield label="Zmrazene">
      <mwc-checkbox label="Zmrazene" required="">
        <mwc-icon slot="leading-icon">
          fingerprint
        </mwc-icon>
      </mwc-checkbox>
    </mwc-formfield>
   <md-filled-text-field label="Choroby">
      <md-icon slot="leading-icon">
        fingerprint
      </md-icon>
   </md-filled-text-field>
    <md-filled-text-field label="Expiracia" type="date" value="NaN-aN-aN">
      <md-icon slot="leading-icon">
        calendar
      </md-icon>
    </md-filled-text-field>
    <md-filled-text-field label="Vytvorenie záznamu" readonly="" type="date" value="NaN-aN-aN">
      <md-icon slot="leading-icon">
        calendar
      </md-icon>
    </md-filled-text-field>
    <md-filled-text-field label="Úprava záznamu" readonly="" type="date" value="NaN-aN-aN">
      <md-icon slot="leading-icon">
        calendar
      </md-icon>
    </md-filled-text-field>
  </form>
  <hr class="line-separator">
  <hr class="line-separator">
  <label>
    Obsah
 </label>
  <md-filled-text-field label="Hemoglobin" required="">
  <md-icon slot="leading-icon">
      fingerprint
    </md-icon>
  </md-filled-text-field>
<mwc-formfield label="Erytrocyty">
    <mwc-checkbox label="Erytrocyty" required="">
      <mwc-icon slot="leading-icon">
        fingerprint
  </mwc-icon>
    </mwc-checkbox>
  </mwc-formfield>
  <mwc-formfield label="Leukocyty">
    <mwc-checkbox label="Leukocyty" required="">
      <mwc-icon slot="leading-icon">
        fingerprint
      </mwc-icon>
    </mwc-checkbox>
  </mwc-formfield>
  <mwc-formfield label="Trombocyty">
    <mwc-checkbox label="Trombocyty" required="">
      <mwc-icon slot="leading-icon">
        fingerprint
      </mwc-icon>
  </mwc-checkbox>
  </mwc-formfield>
  <mwc-formfield label="Plazma">
    <mwc-checkbox label="Plazma" required="">
      <mwc-icon slot="leading-icon">
        fingerprint
      </mwc-icon>
    </mwc-checkbox>
 </mwc-formfield>
  <md-filled-text-field label="Dodatocne">
    <md-icon slot="leading-icon">
      fingerprint
    </md-icon>
  </md-filled-text-field>
  <md-divider></md-divider>
  <div class="actions">
    <md-filled-tonal-button disabled="" id="delete">
      <md-icon slot="icon">
        delete
      </md-icon>
     Zmazať
    </md-filled-tonal-button>
    <span class="stretch-fill"></span>
   <md-outlined-button id="cancel">
      Zrušiť
    </md-outlined-button>
    <md-filled-button disabled="" id="confirm">
      <md-icon slot="icon">
     save
   </md-icon>
     Uložiť
   </md-filled-button>
</div>
    `
    );

    const element = await page.find('sprava-krvi-uniteditor');
  });
});
