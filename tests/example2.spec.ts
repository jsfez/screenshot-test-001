import { expect, test } from "@playwright/test";
import { argosScreenshot } from "@argos-ci/playwright";
import { loadEnvFile } from "process";

const urls = ["https://thepointsguy.com/credit-cards/business-pm"];

test.describe("Visual Regression for TPG Categories", () => {
  for (const url of urls) {
    test(`Review the page - ${url}`, async ({ page }) => {
      await page.goto(url);
      await page.waitForSelector("text=Loading best cards...", {
        state: "hidden",
      });

      // Click on "I Accept" button on the cookie banner if it exists
      // await expect(
      //   page.getByRole("button", { name: "I Accept" })
      // ).toBeEnabled();
      // await page.getByRole("button", { name: "I Accept" }).click();

      // Get count of view more buttons
      const viewMoreButtons = page.locator('[data-testid="viewMorebutton"]');
      const count = await viewMoreButtons.count();
      expect(count).toBeGreaterThan(0);

      for (const viewMoreButton of await viewMoreButtons.all()) {
        await viewMoreButton.click();
        await page.waitForTimeout(500);
      }

      const remainingButtonsCount = await page
        .getByRole("button", { name: "View More" })
        .count();
      console.log(
        'example-2  - remaining closes "view more" buttons: ' +
          remainingButtonsCount
      );

      await argosScreenshot(page, `example-2`);
    });
  }
});
