import { LookUpBelfastAngularPage } from './app.po';

describe('look-up-belfast-angular App', () => {
  let page: LookUpBelfastAngularPage;

  beforeEach(() => {
    page = new LookUpBelfastAngularPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
