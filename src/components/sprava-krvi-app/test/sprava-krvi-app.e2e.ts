import { newE2EPage } from '@stencil/core/testing';

describe('sprava-krvi-app', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<sprava-krvi-app></sprava-krvi-app>');

    const element = await page.find('sprava-krvi-app');
    expect(element).toHaveClass('hydrated');
  });
});
