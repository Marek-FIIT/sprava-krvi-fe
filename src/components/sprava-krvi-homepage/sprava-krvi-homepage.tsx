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
        <div class="container">
        <h1>
            <span style={{ color: 'red' }}>Sprav</span>
            <span style={{ color: 'black' }}>Krv</span>
        </h1>
        <p>Efektívny systém pre manažment darcov a ich jednotiek krvi, pre jednoduchý prehľad a modifikáciu týchto dát.</p>
        <md-filled-button class="button" id="Donors"
          onClick={() => this.donorsClicked.emit("donors")}>
          Darcovia
        </md-filled-button>

        <md-filled-button class="button" id="Units"
          onClick={() => this.unitsClicked.emit("units")}>
          Krvné jednotky
        </md-filled-button>
        </div>
      </Host>
    );
  }

}
