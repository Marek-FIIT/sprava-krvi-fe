import { newSpecPage } from '@stencil/core/testing';
import { SpravaKrviApp } from '../sprava-krvi-app';

describe('sprava-krvi-app', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SpravaKrviApp],
      html: `<sprava-krvi-app></sprava-krvi-app>`,
    });
    expect(page.root).toEqualHtml(`
      <sprava-krvi-app>
        <mock:shadow-root>
        <img src='https://imgb.ifunny.co/images/171a6d99da402b4f4fe5654590e5e97908d6f1f1e54a9bde0080b7cac77206ad_1.jpg'/>
        </mock:shadow-root>
      </sprava-krvi-app>
    `);
  });
});
