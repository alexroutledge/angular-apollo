import { AppPage } from './app.po';

describe('Angular Starter Kit App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should have a title', () => {
    page.navigateTo();
    expect(page.getTitleText()).toContain('Angular Starter Kit');
  });
});
