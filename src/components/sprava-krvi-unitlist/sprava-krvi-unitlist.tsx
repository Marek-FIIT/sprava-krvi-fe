import { Component, Event, EventEmitter,  Host, h } from '@stencil/core';

@Component({
  tag: 'sprava-krvi-unitlist',
  styleUrl: 'sprava-krvi-unitlist.css',
  shadow: true,
})
export class SpravaKrviUnitlist {
  @Event({ eventName: "entry-clicked"}) entryClicked: EventEmitter<string>;
  @Event({eventName: "editor-closed"}) editorClosed: EventEmitter<string>;
  units: any[];

  private async getUnitsAsync(){
    return await Promise.resolve(
      [{
          name: '0+',
          condition: 'safe'
      }, {
        name: 'A-',
        condition: 'safe'
      }, {
        name: 'AB-',
        condition: 'contaminated'
      }]
    );
  }

  async componentWillLoad() {
    this.units = await this.getUnitsAsync();
  }
  render() {
    return (
      <Host>
          <md-list>
          {this.units.map((unit, index) =>
            <md-list-item onClick={ () => this.entryClicked.emit(index.toString())}>
              <div slot="headline">{unit.name}</div>
                <md-icon slot="start">person</md-icon>
            </md-list-item>
          )}
        </md-list>
        <md-filled-button id="cancel"
          onClick={() => this.editorClosed.emit("cancel")}>
          <md-icon slot="icon">homepage</md-icon>
          Domov
        </md-filled-button>
      </Host>
    );
  }
}
