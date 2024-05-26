import { Component, Event, EventEmitter, Host, Prop, State, h } from '@stencil/core';
import { UnitsApiFactory, UnitListEntry } from '../../api/sprava-krvi';

@Component({
  tag: 'sprava-krvi-unitlist',
  styleUrl: 'sprava-krvi-unitlist.css',
  shadow: true,
})
export class SpravaKrviUnitlist {
  @Event({ eventName: "entry-clicked"}) entryClicked: EventEmitter<string>;
  @Event({eventName: "editor-closed"}) editorClosed: EventEmitter<string>;
  @Prop() apiBase: string;
  @State() errorMessage: string;
  @State() changed: boolean = false;


  @Prop() blood_type: string = null;
  @Prop() blood_rh: string = null;
  @Prop() status: string = null;
  @Prop() location: string = null;

  @Prop() erythrocytes: string = null;
  @Prop() leukocytes: string = null;
  @Prop() platelets: string = null;
  @Prop() plasma: string = null;
  @Prop() frozen: string = null;

  @Prop() erythrocytes_bool: boolean = null;
  @Prop() leukocytes_bool: boolean = null;
  @Prop() platelets_bool: boolean = null;
  @Prop() plasma_bool: boolean = null;
  @Prop() frozen_bool: boolean = null;
  units: UnitListEntry[];

  private async getUnitsAsync(btype?, brh?, stat?, loc?, ery?, leu?, plate?, plas?, froz?): Promise<UnitListEntry[]>{
    try {
      if (btype === "All")
        btype = null;
      if (brh === "All")
        brh = null;
      if (stat === "All")
        stat = null;
      if (ery === "All")
        this.erythrocytes_bool = null;
      if (leu === "All")
        this.leukocytes_bool = null;
      if (plate === "All")
        this.platelets_bool = null;
      if (plas === "All")
        this.plasma_bool = null;
      if (froz === "All")
        this.frozen_bool = null;

      console.log(btype);
      if (ery === "True")
        this.erythrocytes_bool = true;
      if (ery === "False")
        this.erythrocytes_bool = false;

      if (leu === "True")
        this.leukocytes_bool = true;
      if (leu === "False")
        this.leukocytes_bool = false;

      if (plate === "True")
        this.platelets_bool = true;
      if (plate === "False")
        this.platelets_bool = false;

      if (plas === "True")
        this.plasma_bool = true;
      if (plas === "False")
        this.plasma_bool = false;

      if (froz === "True")
        this.frozen_bool = true;
      if (froz === "False")
        this.frozen_bool = false;

      const response = await
      UnitsApiFactory(undefined, this.apiBase).
          getUnits(btype, brh, stat, loc, this.erythrocytes_bool, this.leukocytes_bool, this.platelets_bool, this.plasma_bool, this.frozen_bool)
      if (response.status < 299) {
        console.log(response.data)
        console.log(typeof response.data)
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
    this.units = await this.getUnitsAsync(this.blood_type, this.blood_rh, this.status, this.location, this.erythrocytes, this.leukocytes, this.platelets, this.plasma, this.frozen);
    this.changed = false;
  }
  render() {
    return (
      <Host>
        <div class="container">
        <h1>Zoznam jednotiek krvi</h1>
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

        <md-filled-select label="Filter status"
        oninput = {async (ev: InputEvent) => {{
          this.status = this.handleInputEvent(ev);
          this.componentWillLoad()
       }
       } }
            >
          <md-icon slot="leading-icon">sick</md-icon>
          <md-select-option value="All">
            <div slot="headline">All</div>
          </md-select-option>
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
            <div slot="headline">reserved</div>
          </md-select-option>
          <md-select-option value="contaminated">
            <div slot="headline">contaminated</div>
          </md-select-option>
          <md-select-option value="expired">
            <div slot="headline">reserved</div>
          </md-select-option>
        </md-filled-select>
        
        <md-filled-text-field label="Lokacia" 
        oninput = {async (ev: InputEvent) => {{
          this.location = this.handleInputEvent(ev);
          this.componentWillLoad()
       }
       } }>
          <md-icon slot="leading-icon">fingerprint</md-icon>
        </md-filled-text-field>

        <md-filled-select label="Filter erytrocyty"
          oninput = { async (ev: InputEvent) => {{
            this.erythrocytes = this.handleInputEvent(ev);
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
        
        <md-filled-select label="Filter leukocyty"
          oninput = { async (ev: InputEvent) => {{
            this.leukocytes = this.handleInputEvent(ev);
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

        <md-filled-select label="Filter trombocyty"
          oninput = { async (ev: InputEvent) => {{
            this.platelets = this.handleInputEvent(ev);
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
        
        <md-filled-select label="Filter plazma"
          oninput = { async (ev: InputEvent) => {{
            this.plasma = this.handleInputEvent(ev);
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
        
        <md-filled-select label="Filter zmrazene"
          oninput = { async (ev: InputEvent) => {{
            this.frozen = this.handleInputEvent(ev);
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
      {this.units != null && (
        <md-list>
          {this.units.map((donor) => (
            <md-list-item onClick={() => this.entryClicked.emit(donor.id)}>
              <div slot="headline">{donor.id}</div>
              <div slot="supporting-text">{donor.blood_type + " " + donor.blood_rh}</div>
              <div slot="supporting-text">{donor.status}</div>
              <div slot="supporting-text">{donor.location}</div>
              <md-icon slot="start">person</md-icon>
            </md-list-item>
          ))}
        </md-list>
      )}
      <md-filled-button id="cancel" onClick={() => this.editorClosed.emit("cancel")}>
        <md-icon slot="icon">homepage</md-icon>
        Domov
      </md-filled-button>
    </div>
  )}
  </div>
</Host>

    );
  }

  private handleInputEvent( ev: InputEvent): string {
    const target = ev.target as HTMLInputElement;
    return target.value
  }
}
