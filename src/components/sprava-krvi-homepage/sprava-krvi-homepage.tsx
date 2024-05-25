import { Component, Event, EventEmitter,  Host, h } from '@stencil/core';

@Component({
  tag: 'sprava-krvi-homepage',
  styleUrl: 'sprava-krvi-homepage.css',
  shadow: true,
})
export class SpravaKrviHomepage {
  @Event({ eventName: "donors-clicked"}) donorsClicked: EventEmitter<string>;
  @Event({ eventName: "units-clicked"}) unitsClicked: EventEmitter<string>;
  render() {
    return (
      <Host>
        <div class="actions">
        <md-filled-button id="Donors"
          onClick={() => this.donorsClicked.emit("donors")}>
          Darcovia
        </md-filled-button>
        <md-filled-button id="Units"
          onClick={() => this.unitsClicked.emit("units")}>
          Unity
        </md-filled-button>
        </div>
      </Host>
    );
  }

}
