import { newE2EPage } from '@stencil/core/testing';

describe('sprava-krvi-list', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<sprava-krvi-list></sprava-krvi-list>');

    const element = await page.find('sprava-krvi-list');
    expect(element).toHaveClass('hydrated');
  });
});
