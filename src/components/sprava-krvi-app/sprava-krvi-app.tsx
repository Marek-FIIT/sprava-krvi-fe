import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'sprava-krvi-app',
  styleUrl: 'sprava-krvi-app.css',
  shadow: true,
})
export class SpravaKrviApp {

  render() {
    return (
      <Host>
        <slot>Hehe</slot>
      </Host>
    );
  }

}
