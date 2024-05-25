import { newE2EPage } from '@stencil/core/testing';

describe('sprava-krvi-uniteditor', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<sprava-krvi-uniteditor></sprava-krvi-uniteditor>');

    const element = await page.find('sprava-krvi-uniteditor');
    expect(element).toHaveClass('hydrated');
  });
});
