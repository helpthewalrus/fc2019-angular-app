import { browser, by, element, ElementFinder } from "protractor";

export class AppPage {
  async navigateTo() {
    return (await browser.get(browser.baseUrl)) as Promise<any>;
  }

  getTitleText() {
    return element(by.css(".header-container .app-title")).getText() as Promise<
      string
    >;
  }

  getOnlyCreatedByMeInput(): ElementFinder {
    return element(by.css(".checkbox-container__input"));
  }

  getOnlyCreatedByMeLabel(): ElementFinder {
    return element(by.css(".checkbox-container__label"));
  }

  getChooseNewsSourceButton(): ElementFinder {
    return element(by.css(".sources-filter__current"));
  }

  getChooseNewsSourceOption(): ElementFinder {
    return element.all(by.css(".sources-filter__option")).first();
  }

  getNewsList(): ElementFinder {
    return element(by.css(".news-list"));
  }

  getLoadMoreButton(): ElementFinder {
    return element(by.css(".load-news"));
  }
}
