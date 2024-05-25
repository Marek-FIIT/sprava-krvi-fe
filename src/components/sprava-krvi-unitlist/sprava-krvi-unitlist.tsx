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

  units: UnitListEntry[];

  private async getUnitsAsync(): Promise<UnitListEntry[]>{
    try {
      const response = await
      UnitsApiFactory(undefined, this.apiBase).
          getUnits()
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
    this.units = await this.getUnitsAsync();
  }
  render() {
    return (
      <Host>
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
</Host>

    );
  }
}
