import { MaterialDashboardAngularPage } from './app.po';

describe('material-dashboard-angular App', () => {
  let page: MaterialDashboardAngularPage;

  beforeEach(() => {
    page = new MaterialDashboardAngularPage();
  });

  it('should display message saying app works', async () => {
    page.navigateTo();
    expect(await page.getParagraphText()).toEqual('app works!');
  });
});
