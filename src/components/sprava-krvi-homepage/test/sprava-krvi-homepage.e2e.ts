import { newE2EPage } from '@stencil/core/testing';

describe('sprava-krvi-homepage', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<sprava-krvi-homepage></sprava-krvi-homepage>');

    const element = await page.find('sprava-krvi-homepage');
    expect(element).toHaveClass('hydrated');
  });
});
