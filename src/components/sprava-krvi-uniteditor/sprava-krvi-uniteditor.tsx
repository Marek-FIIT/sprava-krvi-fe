import { Component, Host, Prop, State, EventEmitter, Event, h } from '@stencil/core';
import { UnitsApiFactory, Unit, UnitContents} from '../../api/sprava-krvi';
@Component({
  tag: 'sprava-krvi-uniteditor',
  styleUrl: 'sprava-krvi-uniteditor.css',
  shadow: true,
})
export class SpravaKrviUniteditor {
  @Prop() entryId: string;
  @Prop() donorData: URLSearchParams;
  @Prop() amountUnit: string;
  @Prop() apiBase: string;
  @Prop() unitContent: UnitContents = { hemoglobin: 0, erythrocytes: false, leukocytes: false, platelets: false, plasma: false, additional: [] };

  @Event({eventName: "editor-closed"}) editorClosed: EventEmitter<string>;

  @State() entry: Unit;
  @State() errorMessage:string;
  @State() isValid: boolean;

  private formElement: HTMLFormElement;
  
  private async getUnitEntryAsync(): Promise<Unit> {
    if(this.entryId === "@new") {
      this.isValid = false;
      console.log(this.donorData.get('bloodRh'));
      this.entry = {
        donor_id: this.donorData.get('donorId'),
        location: this.donorData.get('location'),
        blood_type: this.donorData.get('bloodType'),
        blood_rh: this.donorData.get('bloodRh'),
        contents: this.unitContent
      };
      return this.entry;
    }

    if ( !this.entryId ) {
       this.isValid = false;
       return undefined
    }
    try {
       const response
           = await UnitsApiFactory(undefined, this.apiBase)
             .getUnit(this.entryId)
       if (response.status < 299) {
          this.entry = response.data;
          this.isValid = true;
       } else {
          this.errorMessage = `Cannot retrieve list of donor: ${response.statusText}`
       }
    } catch (err: any) {
       this.errorMessage = `Cannot retrieve list of donor: ${err.message || "unknown"}`
    }
    return undefined;
 }

 async componentWillLoad() {
  this.getUnitEntryAsync();
}
render() {
  if(this.errorMessage) {
    return (
    <Host>
       <div class="error">{this.errorMessage}</div>
    </Host>
    )
 }
  return (
    <Host>
      <div class="container">
      {this.entryId === "@new" && (
        <h1>Vytvorenie jednotiek krvi</h1>
      )}
       {this.entryId !== "@new" && (
        <h1>Editovanie jednotky krvi</h1>
      )}

      <form ref={el => this.formElement = el}>
      {this.entryId === "@new" && (
        <md-filled-text-field label="Mnozstvo" 
          value={0}
          required
          oninput={(ev: InputEvent) => {
            this.amountUnit = this.handleInputEvent(ev);
          }}>
          <md-icon slot="leading-icon">fingerprint</md-icon>
        </md-filled-text-field>
        
      )}

        {this.entryId !== "@new" && (
        <md-filled-text-field label="ID" 
          value={this.entry?.id}
          readonly
          oninput={ (ev: InputEvent) => {
                if(this.entry) {this.entry.id = this.handleInputEvent(ev)}
              } }>
          <md-icon slot="leading-icon">person</md-icon>
        </md-filled-text-field>
        )}
        <md-filled-text-field label="Darcove ID"
        readonly 
        required value={this.entry?.donor_id}
              oninput={ (ev: InputEvent) => {
                if(this.entry) {this.entry.donor_id = this.handleInputEvent(ev)}
              } }>
          <md-icon slot="leading-icon">person</md-icon>
        </md-filled-text-field>
        {this.entryId !== "@new" && (
        <md-filled-text-field label="ID darovania"
            readonly 
            value={this.entry?.donation_id}
            oninput={ (ev: InputEvent) => {
                if(this.entry) {this.entry.donation_id = this.handleInputEvent(ev)}
            } }>
          <md-icon slot="leading-icon">fingerprint</md-icon>
        </md-filled-text-field>
        )}
        <md-filled-select label="Typ krvi"
            value={this.entry?.blood_type}
            oninput = { (ev: InputEvent) => {
                if(this.entry) {this.entry.blood_type = this.handleInputEvent(ev)}
            } }>
          <md-icon slot="leading-icon">sick</md-icon>
          <md-select-option value="AB">
            <div slot="headline">AB</div>
          </md-select-option>
          <md-select-option value="A">
            <div slot="headline">A</div>
          </md-select-option>
          <md-select-option value="B">
            <div slot="headline">B</div>
          </md-select-option>
          <md-select-option value="0">
            <div slot="headline">0</div>
          </md-select-option>
        </md-filled-select>
      
        <md-filled-select label="RH Faktor"
            value={this.entry?.blood_rh}
            oninput = { (ev: InputEvent) => {
                if(this.entry) {this.entry.blood_rh = this.handleInputEvent(ev)}
            } }>
          <md-icon slot="leading-icon">sick</md-icon>
          <md-select-option value="+">
            <div slot="headline">+</div>
          </md-select-option>
          <md-select-option value="-">
            <div slot="headline">-</div>
          </md-select-option>
        </md-filled-select>
        
        {this.entryId !== "@new" && (
        <md-filled-select label="Status"
            value={this.entry?.status}
            oninput = { (ev: InputEvent) => {
                if(this.entry) {this.entry.status = this.handleInputEvent(ev)}
            } }>
          <md-icon slot="leading-icon">sick</md-icon>
          <md-select-option value="available">
            <div slot="headline">available</div>
          </md-select-option>
          <md-select-option value="reserved">
            <div slot="headline">reserved</div>
          </md-select-option>
          <md-select-option value="unprocessed">
            <div slot="headline">unprocessed</div>
          </md-select-option>
          <md-select-option value="suspended">
            <div slot="headline">suspended</div>
          </md-select-option>
          <md-select-option value="contaminated">
            <div slot="headline">contaminated</div>
          </md-select-option>
          <md-select-option value="expired">
            <div slot="headline">expired</div>
          </md-select-option>
        </md-filled-select>
        )}

        <md-filled-text-field label="Lokacia" 
            required value={this.entry?.location}
            oninput={ (ev: InputEvent) => {
                if(this.entry) {this.entry.location = this.handleInputEvent(ev)}
            } }>
          <md-icon slot="leading-icon">fingerprint</md-icon>
        </md-filled-text-field>

        {this.entryId !== "@new" && (
        <mwc-formfield label="Zmrazene">
          <mwc-checkbox label="Zmrazene"
          checked={this.entry?.frozen}
          required
          oninput={(ev: InputEvent) => {
            if (this.entry) {
              this.entry.frozen = this.handleInputEventBoolean(ev);
            }
          }}>
          <mwc-icon slot="leading-icon">fingerprint</mwc-icon>
          </mwc-checkbox>
        </mwc-formfield>
        )}

        <md-filled-text-field label="Choroby" 
        value={this.entry?.diseases}
              oninput={ (ev: InputEvent) => {
                if(this.entry) {this.entry.diseases = this.handleInputEvent(ev).split(',')}
              } }>
          <md-icon slot="leading-icon">fingerprint</md-icon>
        </md-filled-text-field>

        {this.entryId !== "@new" && (
        <md-filled-text-field label="Expiracia"
        type="date" 
        value={this.formatDate(this.entry?.expiration)}
        oninput={(ev: InputEvent) => {
            if(this.entry) {this.entry.expiration = this.parseInputDate(ev)}
        }}>
        <md-icon slot="leading-icon">calendar</md-icon>
        </md-filled-text-field>
        )}

        {this.entryId !== "@new" && (
        <md-filled-text-field label="Vytvorenie záznamu"
        type="date" 
        readonly
        value={this.formatDate(this.entry?.created_at)}
        oninput={(ev: InputEvent) => {
            if(this.entry) {this.entry.created_at = this.parseInputDate(ev)}
        }}>
        <md-icon slot="leading-icon">calendar</md-icon>
        </md-filled-text-field>
        )}

        {this.entryId !== "@new" && (
        <md-filled-text-field label="Úprava záznamu" 
        type="date"
        readonly
        value={this.formatDate(this.entry?.updated_at)}
        oninput={(ev: InputEvent) => {
            if(this.entry) {this.entry.updated_at = this.parseInputDate(ev)}
        }}>
        <md-icon slot="leading-icon">calendar</md-icon>
        </md-filled-text-field>
        )}
      </form>
      
      <hr class="line-separator" />
      <hr class="line-separator" />
      <label>Obsah</label>
        <md-filled-text-field label="Hemoglobin" 
            required value={this.entry?.contents?.hemoglobin}
            oninput={ (ev: InputEvent) => {
                if(this.entry) {this.entry.contents.hemoglobin = parseFloat(this.handleInputEvent(ev))}
            } }>
          <md-icon slot="leading-icon">fingerprint</md-icon>
        </md-filled-text-field>

        <mwc-formfield label="Erytrocyty">
          <mwc-checkbox label="Erytrocyty"
          checked={this.entry?.contents?.erythrocytes}
          required
          oninput={(ev: InputEvent) => {
            if (this.entry) {
              this.entry.contents.erythrocytes = this.handleInputEventBoolean(ev);
            }
          }}>
          <mwc-icon slot="leading-icon">fingerprint</mwc-icon>
          </mwc-checkbox>
        </mwc-formfield>

        <mwc-formfield label="Leukocyty">
          <mwc-checkbox label="Leukocyty"
          checked={this.entry?.contents?.leukocytes}
          required
          oninput={(ev: InputEvent) => {
            if (this.entry) {
              this.entry.contents.leukocytes = this.handleInputEventBoolean(ev);
            }
          }}>
          <mwc-icon slot="leading-icon">fingerprint</mwc-icon>
          </mwc-checkbox>
        </mwc-formfield>

        <mwc-formfield label="Trombocyty">
          <mwc-checkbox label="Trombocyty"
          checked={this.entry?.contents?.platelets}
          required
          oninput={(ev: InputEvent) => {
            if (this.entry) {
              this.entry.contents.platelets = this.handleInputEventBoolean(ev);
            }
          }}>
          <mwc-icon slot="leading-icon">fingerprint</mwc-icon>
          </mwc-checkbox>
        </mwc-formfield>

        <mwc-formfield label="Plazma">
          <mwc-checkbox label="Plazma"
          checked={this.entry?.contents?.plasma}
          required
          oninput={(ev: InputEvent) => {
            if (this.entry) {
              this.entry.contents.plasma = this.handleInputEventBoolean(ev);
            }
          }}>
          <mwc-icon slot="leading-icon">fingerprint</mwc-icon>
          </mwc-checkbox>
        </mwc-formfield>

        <md-filled-text-field label="Dodatocne" 
        value={this.entry?.contents?.additional}
              oninput={ (ev: InputEvent) => {
                if(this.entry) {this.entry.contents.additional = this.handleInputEvent(ev).split(',')}
              } }>
          <md-icon slot="leading-icon">fingerprint</md-icon>
        </md-filled-text-field>
        
      <md-divider></md-divider>
      <div class="actions">
      {this.entryId !== "@new" && (
      <md-filled-tonal-button id="delete" disabled={!this.entry || this.entry?.id === "@new" }
            onClick={() => this.deleteEntry()} >
          <md-icon slot="icon">delete</md-icon>
          Zmazať
        </md-filled-tonal-button>
        )}
        <span class="stretch-fill"></span>
        <md-outlined-button id="cancel"
          onClick={() => this.editorClosed.emit("cancel")}>
          Zrušiť
        </md-outlined-button>
        <md-filled-button id="confirm" disabled={ !this.isValid }
            onClick={() => this.updateEntry() }>
          <md-icon slot="icon">save</md-icon>
          Uložiť
        </md-filled-button>
      </div>
      </div>
    </Host>
  );
}

private handleInputEvent( ev: InputEvent): string {
  const target = ev.target as HTMLInputElement;
  // check validity of elements
  this.isValid = true;
  for (let i = 0; i < this.formElement.children.length; i++) {
     const element = this.formElement.children[i]
     if ("reportValidity" in element) {
     const valid = (element as HTMLInputElement).reportValidity();
     this.isValid &&= valid;
     }
  }
  return target.value
}

private handleInputEventBoolean(ev: InputEvent): boolean {
  const target = ev.target as HTMLInputElement;
  
  // Check validity of elements
  this.isValid = true;
  for (let i = 0; i < this.formElement.children.length; i++) {
     const element = this.formElement.children[i] as HTMLInputElement;
     if ("reportValidity" in element) {
       const valid = element.reportValidity();
       this.isValid &&= valid;
     }
  }
  // Return the boolean state of the checkbox
  if(target.checked == true)
    target.checked = false
  else
    target.checked = true
  console.log(target.checked)
  console.log(typeof target.checked)
  return target.checked;
}

private async updateEntry() {
  try {
    const api = UnitsApiFactory(undefined, this.apiBase);
    const response
       = this.entryId === "@new"
       ? await api.createUnits(parseInt(this.amountUnit), this.entry)
       : await api.updateUnit(this.entryId, this.entry);
      if (response.status < 299) {
        this.editorClosed.emit("store")
      } else {
        this.errorMessage = `Cannot store entry: ${response.statusText}`
      }
    } catch (err: any) {
      this.errorMessage = `Cannot store entry: ${err.message || "unknown"}`
    }
}

private async deleteEntry() {
  try {
     const response = await UnitsApiFactory(undefined, this.apiBase)
        .deleteUnit(this.entryId)
     if (response.status < 299) {
     this.editorClosed.emit("delete")
     } else {
     this.errorMessage = `Cannot delete entry: ${response.statusText}`
     }
  } catch (err: any) {
     this.errorMessage = `Cannot delete entry: ${err.message || "unknown"}`
  }
}

private formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
}

// Function to parse the date input value to 'yyyy-mm-dd' format
private parseInputDate(ev) {
  const inputDate = new Date((ev.target as HTMLInputElement).value);
  if (isNaN(inputDate.getTime())) {
      // Handle invalid date input
      return '';
  } else {
      const year = inputDate.getFullYear();
      const month = ('0' + (inputDate.getMonth() + 1)).slice(-2);
      const day = ('0' + inputDate.getDate()).slice(-2);
      console.log(`${year}-${month}-${day}T00:00:00.000Z`)
      return `${year}-${month}-${day}T00:00:00.000Z`;
  }
}


}
