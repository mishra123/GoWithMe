import { DestnationSAPage } from './app.po';

describe('destnation-sa App', () => {
  let page: DestnationSAPage;

  beforeEach(() => {
    page = new DestnationSAPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
