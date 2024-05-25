import { newSpecPage } from '@stencil/core/testing';
import { SpravaKrviUnitlist } from '../sprava-krvi-unitlist';

describe('sprava-krvi-unitlist', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SpravaKrviUnitlist],
      html: `<sprava-krvi-unitlist></sprava-krvi-unitlist>`,
    });
    expect(page.root).toEqualHtml(`
      <sprava-krvi-unitlist>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </sprava-krvi-unitlist>
    `);
  });
});
