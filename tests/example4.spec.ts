import { expect, test } from "@playwright/test";
import { argosScreenshot } from "@argos-ci/playwright";
import { count } from "console";

const urls = ["https://thepointsguy.com/credit-cards/cash-back/"];

async function clickViewMoreButtons(page) {
  const viewMoreButtonLocator = page
    .getByRole("button", { name: "View More" })
    .first();

  let i = 1;
  let viewMoreButton = await viewMoreButtonLocator;
  while (await viewMoreButton.isVisible()) {
    await expect(await viewMoreButtonLocator).toBeEnabled();
    await viewMoreButton.click();
    console.log("Clicked on 'View More' button: " + i++);
    await page.waitForTimeout(500);
    viewMoreButton = await viewMoreButtonLocator;
  }
}

async function closeCookieBanner(page) {
  await expect(page.getByRole("button", { name: "I Accept" })).toBeEnabled();
  await page.getByRole("button", { name: "I Accept" }).click();
}

test.describe("Visual Regression for TPG Categories", () => {
  for (const url of urls) {
    test(`Review the page - ${url}`, async ({ page }) => {
      await page.goto(url);

      const loader = page.locator("text=Loading best cards...");
      await expect(loader).toBeHidden();

      // await closeCookieBanner(page);

      await clickViewMoreButtons(page);

      const remainingButtonsCount = await page
        .getByRole("button", { name: "View More" })
        .count();
      console.log(
        'example-4 - remaining closes "view more" buttons: ' +
          remainingButtonsCount
      );
      argosScreenshot(page, "example-4");
    });
  }
});
