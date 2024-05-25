import { newE2EPage } from '@stencil/core/testing';

describe('sprava-krvi-editor', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<sprava-krvi-editor></sprava-krvi-editor>');

    const element = await page.find('sprava-krvi-editor');
    expect(element).toHaveClass('hydrated');
  });
});
