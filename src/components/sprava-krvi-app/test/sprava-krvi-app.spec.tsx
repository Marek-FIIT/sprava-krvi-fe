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
        <sprava-krvi-homepage></sprava-krvi-homepage>
        </mock:shadow-root>
      </sprava-krvi-app>
    `);
  });
});
