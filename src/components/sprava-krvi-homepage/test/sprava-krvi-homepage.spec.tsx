import { newSpecPage } from '@stencil/core/testing';
import { SpravaKrviHomepage } from '../sprava-krvi-homepage';

describe('sprava-krvi-homepage', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SpravaKrviHomepage],
      html: `<sprava-krvi-homepage></sprava-krvi-homepage>`,
    });
    expect(page.root).toEqualHtml(`
      <sprava-krvi-homepage>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </sprava-krvi-homepage>
    `);
  });
});
