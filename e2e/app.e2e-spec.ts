import { PaspoortAppPage } from './app.po';

describe('paspoort-app App', () => {
  let page: PaspoortAppPage;

  beforeEach(() => {
    page = new PaspoortAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
