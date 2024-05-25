import { newE2EPage } from '@stencil/core/testing';

describe('sprava-krvi-unitlist', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<sprava-krvi-unitlist></sprava-krvi-unitlist>');

    const element = await page.find('sprava-krvi-unitlist');
    expect(element).toHaveClass('hydrated');
  });
});
