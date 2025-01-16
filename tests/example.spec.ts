import { expect, test } from "@playwright/test";
import { argosScreenshot } from "@argos-ci/playwright";
import { loadEnvFile } from "process";

test("screenshot homepage", async ({ page }) => {
  await page.goto("https://thepointsguy.com/credit-cards/business-pm");

  // wait for "Loading best cards..." to disappear
  await page.waitForSelector("text=Loading best cards...", { state: "hidden" });

  // Click on "I Accept" button on the cookie banner if it exists
  // await expect(page.getByRole("button", { name: "I Accept" })).toBeEnabled();
  // await page.getByRole("button", { name: "I Accept" }).click();

  // click one time on each buttons with the text "View More"
  const viewMoreButtons = await page.$$("text=View More");
  for (const button of viewMoreButtons) {
    await button.click();
  }

  const remainingButtonsCount = await page
    .getByRole("button", { name: "View More" })
    .count();
  console.log(
    'example-1 - remaining closes "view more" buttons: ' + remainingButtonsCount
  );

  await argosScreenshot(page, "example-1");
});
