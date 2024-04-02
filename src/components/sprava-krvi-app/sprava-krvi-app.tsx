import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'sprava-krvi-app',
  styleUrl: 'sprava-krvi-app.css',
  shadow: true,
})
export class SpravaKrviApp {

  render() {
    return (
      <Host>
        <img src={'https://imgb.ifunny.co/images/171a6d99da402b4f4fe5654590e5e97908d6f1f1e54a9bde0080b7cac77206ad_1.jpg'}/>
        {/* <slot>Hehe</slot> */}
      </Host>
    );
  }

}
