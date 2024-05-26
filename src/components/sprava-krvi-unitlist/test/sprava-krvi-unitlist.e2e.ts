import { newE2EPage } from '@stencil/core/testing';

describe('sprava-krvi-unitlist', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<md-filled-select label="Filter blood type">                                                                                               
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
    <md-filled-select label="Filter status">
      <md-icon slot="leading-icon">
        sick
      </md-icon>
      <md-select-option value="All">
        <div slot="headline">
          All
        </div>
      </md-select-option>
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
          reserved
        </div>
      </md-select-option>
      <md-select-option value="contaminated">
        <div slot="headline">
          contaminated
        </div>
      </md-select-option>
      <md-select-option value="expired">
        <div slot="headline">
          reserved
        </div>
      </md-select-option>
    </md-filled-select>
    <md-filled-text-field label="Lokacia">
      <md-icon slot="leading-icon">
        fingerprint
      </md-icon>
    </md-filled-text-field>
    <md-filled-select label="Filter erytrocyty">
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
    <md-filled-select label="Filter leukocyty">
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
    <md-filled-select label="Filter trombocyty">
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
    <md-filled-select label="Filter plazma">
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
    <md-filled-select label="Filter zmrazene">
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
    </div>`
    );

    const element = await page.find('sprava-krvi-unitlist');
  });
});
