import { Component, Host, Prop, State, h, EventEmitter, Event } from '@stencil/core';
import { DonorsApiFactory, Donor } from '../../api/sprava-krvi';

@Component({
  tag: 'sprava-krvi-editor',
  styleUrl: 'sprava-krvi-editor.css',
  shadow: true,
})
export class SpravaKrviEditor {
  @Prop() entryId: string;
  @Prop() apiBase: string;
  @Event({eventName: "editor-closed"}) editorClosed: EventEmitter<string>;
  @Event({eventName: "unit-editor-open"}) unitEditorOpen: EventEmitter<string>;

  @State() entry: Donor;
  @State() errorMessage:string;
  @State() isValid: boolean;

  private formElement: HTMLFormElement;
  // private handleSliderInput(event: Event) {
  //   this.duration = +(event.target as HTMLInputElement).value;
  // }
  
  private async getDonorEntryAsync(): Promise<Donor> {
    if(this.entryId === "@new") {
      this.isValid = false;
      this.entry = {
        birth_number: "",
        first_name: "",
        last_name: "",
        postal_code: "",
        eligible: false
      };
      return this.entry;
    }

    if ( !this.entryId ) {
       this.isValid = false;
       return undefined
    }
    try {
       const response
           = await DonorsApiFactory(undefined, this.apiBase)
             .getDonor(this.entryId)
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
  this.getDonorEntryAsync();
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
        <h1>Vytvorenie darcu</h1>
      )}
       {this.entryId !== "@new" && (
        <h1>Editovanie darcu</h1>
      )}
      <form ref={el => this.formElement = el}>
        <md-filled-text-field label="Meno" 
        required value={this.entry?.first_name}
              oninput={ (ev: InputEvent) => {
                if(this.entry) {this.entry.first_name = this.handleInputEvent(ev)}
              } }>
          <md-icon slot="leading-icon">person</md-icon>
        </md-filled-text-field>

        <md-filled-text-field label="Priezvisko" 
        required value={this.entry?.last_name}
              oninput={ (ev: InputEvent) => {
                if(this.entry) {this.entry.last_name = this.handleInputEvent(ev)}
              } }>
          <md-icon slot="leading-icon">person</md-icon>
        </md-filled-text-field>

        {this.entryId !== "@new" && (
        <md-filled-text-field label="ID" 
            value={this.entry?.id}
            readonly
            oninput={ (ev: InputEvent) => {
                if(this.entry) {this.entry.id = this.handleInputEvent(ev)}
            } }>
          <md-icon slot="leading-icon">fingerprint</md-icon>
        </md-filled-text-field>
        )}

        <md-filled-text-field label="Rodné Číslo" 
            required value={this.entry?.birth_number}
            oninput={ (ev: InputEvent) => {
                if(this.entry) {this.entry.birth_number = this.handleInputEvent(ev)}
            } }>
          <md-icon slot="leading-icon">fingerprint</md-icon>
        </md-filled-text-field>

        <md-filled-text-field label="Poštové smerové číslo" 
            required value={this.entry?.postal_code}
            oninput={ (ev: InputEvent) => {
                if(this.entry) {this.entry.postal_code = this.handleInputEvent(ev)}
            } }>
          <md-icon slot="leading-icon">fingerprint</md-icon>
        </md-filled-text-field>

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
        
        <mwc-formfield label="Darovania schopny">
          <mwc-checkbox label="Darovania schopny"
          checked={this.entry?.eligible}
          required
          oninput={(ev: InputEvent) => {
            if (this.entry) {
              this.entry.eligible = this.handleInputEventBoolean(ev);
            }
          }}>
          <mwc-icon slot="leading-icon">fingerprint</mwc-icon>
          </mwc-checkbox>
        </mwc-formfield>
        
        {this.entryId !== "@new" && (
        <md-filled-text-field label="Posledné darovanie"
        type="date" 
        readonly 
        value={this.formatDate(this.entry?.last_donation)}
        oninput={(ev: InputEvent) => {
            if(this.entry) {this.entry.last_donation = this.parseInputDate(ev)}
        }}>
        <md-icon slot="leading-icon">calendar</md-icon>
        </md-filled-text-field>
        )}

        <md-filled-text-field label="Email" 
        value={this.entry?.email}
              oninput={ (ev: InputEvent) => {
                if(this.entry) {this.entry.email = this.handleInputEvent(ev)}
              } }>
          <md-icon slot="leading-icon">fingerprint</md-icon>
        </md-filled-text-field>

        <md-filled-text-field label="Telefón" 
        value={this.entry?.phone_number}
              oninput={ (ev: InputEvent) => {
                if(this.entry) {this.entry.phone_number = this.handleInputEvent(ev)}
              } }>
          <md-icon slot="leading-icon">fingerprint</md-icon>
        </md-filled-text-field>

        <md-filled-text-field label="Choroby" 
        value={this.entry?.diseases}
              oninput={ (ev: InputEvent) => {
                if(this.entry) {this.entry.diseases = this.handleInputEvent(ev).split(',')}
              } }>
          <md-icon slot="leading-icon">fingerprint</md-icon>
        </md-filled-text-field>

        <md-filled-text-field label="Lieky" 
        value={this.entry?.medications}
              oninput={ (ev: InputEvent) => {
                if(this.entry) {this.entry.medications = this.handleInputEvent(ev).split(',')}
              } }>
          <md-icon slot="leading-icon">fingerprint</md-icon>
        </md-filled-text-field>
        
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
        {this.entryId !== "@new" && (
        <md-filled-button id="create" disabled={ !this.isValid }
            onclick={() => this.unitEditorOpen.emit(`@new?donorId=${this.entry?.id}&location=${this.entry.postal_code}&bloodType=${this.entry?.blood_type}&bloodRh=${encodeURIComponent(this.entry?.blood_rh)}`)}
            >
          <md-icon slot="icon">create</md-icon>
          Vytvorit vzorky
        </md-filled-button>
        )}
        <md-filled-button id="confirm" disabled={ !this.isValid }
            onClick={() => this.updateEntry() }
            >
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
    const api = DonorsApiFactory(undefined, this.apiBase);
    const response
       = this.entryId === "@new"
       ? await api.createDonor(this.entry)
       : await api.updateDonor(this.entryId, this.entry);

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
     const response = await DonorsApiFactory(undefined, this.apiBase)
        .deleteDonor(this.entryId)
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
