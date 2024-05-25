import { Component, Event, EventEmitter, Host, Prop, State, h } from '@stencil/core';
import { DonorsApiFactory, DonorListEntry } from '../../api/sprava-krvi';

@Component({
  tag: 'sprava-krvi-list',
  styleUrl: 'sprava-krvi-list.css',
  shadow: true,
})
export class SpravaKrviList {
  @Event({ eventName: "entry-clicked"}) entryClicked: EventEmitter<string>;
  @Event({eventName: "editor-closed"}) editorClosed: EventEmitter<string>;
  @Prop() apiBase: string;
  @State() errorMessage: string;
  @State() isValid: boolean;
  @State() changed: boolean = false;

  @Prop() blood_type: string = null;
  @Prop() blood_rh: string = null;
  @Prop() eligible: string = null;
  @Prop() eligible_bool: boolean = null;

  Donors: DonorListEntry[];
  private async getDonorsAsync(btype?, brh?, eli?): Promise<DonorListEntry[]>{
    try {
      if (btype === "All")
        btype = null;
      if (brh === "All")
        brh = null;
      if (eli === "All")
        this.eligible_bool = null;
      
      if (eli === "True")
        this.eligible_bool = true;
      if (eli === "False")
        this.eligible_bool = false;
      const response = await

      DonorsApiFactory(undefined, this.apiBase).
          getDonors(btype, brh, this.eligible_bool)

      if (response.status < 299) {
        return response.data;
      } else {
        this.errorMessage = `Cannot retrieve list of waiting patients: ${response.statusText}`
      }
    } catch (err: any) {
      this.errorMessage = `Cannot retrieve list of waiting patients: ${err.message || "unknown"}`
    }
    return [];
  }


  async componentWillLoad() {
    this.changed = true;
    this.Donors = await this.getDonorsAsync(this.blood_type, this.blood_rh, this.eligible);
    this.changed = false;
  }
    
  render() {
    return (
      <Host>
          <md-filled-select label="Filter blood type"
          oninput = { async (ev: InputEvent) => {{
            this.blood_type = this.handleInputEvent(ev);
            this.componentWillLoad()
          }
          } }
           >
          <md-icon slot="leading-icon">sick</md-icon>
          <md-select-option value="All">
            <div slot="headline">All</div>
          </md-select-option>
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

        <md-filled-select label="Filter rh"
        oninput = {async (ev: InputEvent) => {{
          this.blood_rh = this.handleInputEvent(ev);
          this.componentWillLoad()
       }
       } }
            >
          <md-icon slot="leading-icon">sick</md-icon>
          <md-select-option value="All">
            <div slot="headline">All</div>
          </md-select-option>
          <md-select-option value="+">
            <div slot="headline">+</div>
          </md-select-option>
          <md-select-option value="-">
            <div slot="headline">-</div>
          </md-select-option>
        </md-filled-select>

        <md-filled-select label="Filter eligible"
                oninput = {async (ev: InputEvent) => {{
                  this.eligible = this.handleInputEvent(ev);
                  this.componentWillLoad()
               }
               } }
           >
          <md-icon slot="leading-icon">sick</md-icon>
          <md-select-option value="All">
            <div slot="headline">All</div>
          </md-select-option>
          <md-select-option value="True">
            <div slot="headline">True</div>
          </md-select-option>
          <md-select-option value="False">
            <div slot="headline">False</div>
          </md-select-option>
        </md-filled-select>

        <hr class="line-separator" />
  {this.errorMessage ? (
    <div class="error">{this.errorMessage}</div>
  ) : (
    <div>
      {this.Donors != null && (
        <md-list>
          {this.Donors.map((donor) => (
            <md-list-item onClick={() => this.entryClicked.emit(donor.id)}>
              <div slot="headline">{donor.first_name + " " + donor.last_name}</div>
              <div slot="supporting-text">{donor.id}</div>
              <div slot="supporting-text">{donor.blood_type + donor.blood_rh}</div>
              <div slot="supporting-text">{donor.eligible}</div>
              <div slot="supporting-text">{donor.last_donation}</div>
              <md-icon slot="start">person</md-icon>
            </md-list-item>
          ))}
        </md-list>
      )}
      <md-filled-button id="cancel" onClick={() => this.editorClosed.emit("cancel")}>
        <md-icon slot="icon">homepage</md-icon>
        Domov
      </md-filled-button>
    

    <md-filled-icon-button class="add-button" onclick={() => this.entryClicked.emit("@new")}>
      <md-icon>add</md-icon>
    </md-filled-icon-button>
    </div>
  )}
</Host>

    );
  }

  private handleInputEvent( ev: InputEvent): string {
    const target = ev.target as HTMLInputElement;
    return target.value
  }

}
