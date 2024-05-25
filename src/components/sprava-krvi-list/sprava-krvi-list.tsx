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

  Donors: DonorListEntry[];

  private async getDonorsAsync(): Promise<DonorListEntry[]>{
    try {
      const response = await
      DonorsApiFactory(undefined, this.apiBase).
          getDonors()
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
    this.Donors = await this.getDonorsAsync();
  }
  render() {
    return (
      <Host>
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
}
