// @ts-check
import { test, expect } from '@playwright/test';

test('verify welcom message', async ({ page }) => {
  await page.goto('https://qaplayground.com/');
  await expect (page.getByRole('heading',{name:'The Only Automation'})).toBeVisible();
});

test('practice input fields', async ({ page }) => {
  await page.goto('https://qaplayground.com/');
  await page.getByRole('link', { name: 'Practice', exact: true }).click()
  await page.getByTestId('new-practice-card-input-fields').click()
  await page.getByTestId('input-movie-name').fill("Titanic")
  await page.getByTestId('btn-submit-movie').click()
  await expect (page.getByTestId('input-movie-name')).toHaveValue("Titanic")
  await page.getByTestId('btn-read-value').click()
  await expect(page.getByTestId('result-s03')).toHaveText("Value: The Matrix")
  await page.getByTestId('input-clear').fill("text à retirer")
  await page.getByTestId('btn-clear-field').click()
  expect(page.getByTestId('result-s04')).toHaveText("Field cleared ✓")
});

test('Button Automation Practice', async ({ page }) => {
  await page.goto('https://qaplayground.com/');
  await page.getByRole('link', { name: 'Practice', exact: true }).click()
  await page.getByTestId('new-practice-card-buttons').click()
  await page.getByTestId('btn-navigate-home').click()
  await expect (page.getByTestId('result-s01')).toContainText("Home")
  await page.getByTestId('btn-get-coordinates').click()
  await expect (page.getByTestId('result-s02')).toContainText('X:')
  await expect(page.getByTestId('btn-disabled')).toBeDisabled()
  await page.getByTestId('btn-double-click').dblclick()
  await expect (page.getByTestId('result-s07')).toHaveText("Double clicked!")
});



