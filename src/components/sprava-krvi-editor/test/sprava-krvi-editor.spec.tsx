import { newSpecPage } from '@stencil/core/testing';
import { SpravaKrviEditor } from '../sprava-krvi-editor';

describe('sprava-krvi-editor', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SpravaKrviEditor],
      html: `<sprava-krvi-editor></sprava-krvi-editor>`,
    });
    expect(page.root).toEqualHtml(`
      <sprava-krvi-editor>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </sprava-krvi-editor>
    `);
  });
});
