import { AppPage } from "./app.po";
import { browser, logging, by } from "protractor";

describe("workspace-project App", () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  describe("initially", async () => {
    beforeEach(async () => {
      await page.navigateTo();
    });

    it("should display app title equal to News App", async () => {
      expect(await page.getTitleText()).toEqual("News App");
    });

    it("should display checkbox title equal to Only created by me", async () => {
      expect(await page.getOnlyCreatedByMeLabel().getText()).toEqual(
        "Only created by me"
      );
    });
  });

  describe("choose source", async () => {
    beforeEach(async () => {
      await page.navigateTo();
      await page.getChooseNewsSourceButton().click();
      await page.getChooseNewsSourceOption().click();
    });

    it("should load first five news", async () => {
      expect(
        (await page.getNewsList().all(by.css(".news-item"))).length
      ).toEqual(5);
    });
  });

  describe("choose source and press load more button", async () => {
    beforeEach(async () => {
      await page.navigateTo();
      await page.getChooseNewsSourceButton().click();
      await page.getChooseNewsSourceOption().click();
      await page.getLoadMoreButton().click();
    });

    it("should load first ten news", async () => {
      expect(
        (await page.getNewsList().all(by.css(".news-item"))).length
      ).toEqual(10);
    });
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser
      .manage()
      .logs()
      .get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE
      } as logging.Entry)
    );
  });
});
