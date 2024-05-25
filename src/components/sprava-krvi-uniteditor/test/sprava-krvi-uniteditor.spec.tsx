import { newSpecPage } from '@stencil/core/testing';
import { SpravaKrviUniteditor } from '../sprava-krvi-uniteditor';

describe('sprava-krvi-uniteditor', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SpravaKrviUniteditor],
      html: `<sprava-krvi-uniteditor></sprava-krvi-uniteditor>`,
    });
    expect(page.root).toEqualHtml(`
      <sprava-krvi-uniteditor>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </sprava-krvi-uniteditor>
    `);
  });
});
