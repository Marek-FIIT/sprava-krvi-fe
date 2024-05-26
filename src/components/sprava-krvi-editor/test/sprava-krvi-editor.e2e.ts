import { newE2EPage } from '@stencil/core/testing';

describe('sprava-krvi-editor', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <form>                                                                                                                                     
      <md-filled-text-field label="Meno" required="">                                                                                          
        <md-icon slot="leading-icon">
          person
        </md-icon>
      </md-filled-text-field>
      <md-filled-text-field label="Priezvisko" required="">
        <md-icon slot="leading-icon">
          person
        </md-icon>
      </md-filled-text-field>
      <md-filled-text-field label="ID" readonly="">
        <md-icon slot="leading-icon">
          fingerprint
      </md-icon>
      </md-filled-text-field>
      <md-filled-text-field label="Rodné Číslo" required="">
        <md-icon slot="leading-icon">
          fingerprint
        </md-icon>
      </md-filled-text-field>
      <md-filled-text-field label="Poštové smerové číslo" required="">
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
      <mwc-formfield label="Darovania schopny">
        <mwc-checkbox label="Darovania schopny" required="">
          <mwc-icon slot="leading-icon">
            fingerprint
          </mwc-icon>
        </mwc-checkbox>
      </mwc-formfield>
      <md-filled-text-field label="Posledné darovanie" readonly="" type="date" value="NaN-aN-aN">
        <md-icon slot="leading-icon">
          calendar
        </md-icon>
      </md-filled-text-field>
      <md-filled-text-field label="Email">
        <md-icon slot="leading-icon">
          fingerprint
        </md-icon>
      </md-filled-text-field>
      <md-filled-text-field label="Telefón">
        <md-icon slot="leading-icon">
          fingerprint
        </md-icon>
      </md-filled-text-field>
      <md-filled-text-field label="Choroby">
        <md-icon slot="leading-icon">
          fingerprint
        </md-icon>
      </md-filled-text-field>
      <md-filled-text-field label="Lieky">
        <md-icon slot="leading-icon">
          fingerprint
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
      <md-filled-button disabled="" id="create">
        <md-icon slot="icon">
          create
        </md-icon>
        Vytvorit vzorky
      </md-filled-button>
      <md-filled-button disabled="" id="confirm">
        <md-icon slot="icon">
          save
        </md-icon>
        Uložiť
      </md-filled-button>
    </div>
    `);
  });
});
