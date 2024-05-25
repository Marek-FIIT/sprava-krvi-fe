import { newSpecPage } from '@stencil/core/testing';
import { SpravaKrviList } from '../sprava-krvi-list';

describe('sprava-krvi-list', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SpravaKrviList],
      html: `<sprava-krvi-list></sprava-krvi-list>`,
    });
    expect(page.root).toEqualHtml(`
      <sprava-krvi-list>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </sprava-krvi-list>
    `);
  });
});
