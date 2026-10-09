// @ts-check
import { test, expect } from '@playwright/test';
import { describe } from 'node:test';

test('verify welcom message', async ({ page }) => {
  await page.goto('https://qaplayground.com/');
  await expect (page.getByRole('heading',{name:'The Only Automation'})).toBeVisible();
});

test.describe('qaplayground practice', ()=>{
  test.beforeEach(async({page})=>{
      await page.goto('https://qaplayground.com/');
      await page.getByRole('link', { name: 'Practice', exact: true }).click()
  })

test('practice input fields', async ({ page }) => {
  await page.getByTestId('new-practice-card-input-fields').click()
  await page.getByTestId('input-movie-name').fill("Titanic")
  await page.getByTestId('btn-submit-movie').click()
  await expect (page.getByTestId('input-movie-name')).toHaveValue("Titanic")
  await page.getByTestId('btn-read-value').click()
  await expect(page.getByTestId('result-s03')).toHaveText("Value: The Matrix")
  await page.getByTestId('input-clear').fill("text à retirer")
  await page.getByTestId('btn-clear-field').click()
  await expect(page.getByTestId('result-s04')).toHaveText("Field cleared ✓")
});
test('Button Automation Practice', async ({ page }) => {
  await page.getByTestId('new-practice-card-buttons').click()
  await page.getByTestId('btn-navigate-home').click()
  await expect (page.getByTestId('result-s01')).toContainText("Home")
  await page.getByTestId('btn-get-coordinates').click()
  await expect (page.getByTestId('result-s02')).toContainText('X:')
  await expect(page.getByTestId('btn-disabled')).toBeDisabled()
  await page.getByTestId('btn-double-click').dblclick()
  await expect (page.getByTestId('result-s07')).toHaveText("Double clicked!")
});

test('forms Automation Practice', async ({ page }) => {
  await page.getByTestId('new-practice-card-forms').click()
  await page.getByTestId('input-login-email').fill('formsemail@gmail.com')
  await page.getByTestId('form-login-inner').getByRole('textbox', { name: 'Password' }).fill('12345678')
  await page.getByTestId('btn-login-submit').click()
  await expect (page.getByTestId("result-login")).toContainText("Login successful! Welcome")
  //F02
  await page.getByTestId('input-first-name').fill('yazid')
  await page.getByTestId('input-last-name').fill('atek')
  const first=page.getByTestId('input-first-name')
  const last=page.getByTestId('input-last-name')
  await expect(first).toHaveValue('yazid')
  await expect(last).toHaveValue('atek')
  await page.getByTestId('input-phone').fill('0751054905')
  await expect(page.getByTestId('input-phone')).toHaveValue(/^0\d{9}$/);
  await page.getByTestId('input-dob').pressSequentially('24051990')
  await expect(page.getByTestId('input-dob')).toHaveValue('1990-05-24')
  await page.getByTestId('radio-gender-male').check()
  await expect(page.getByTestId('radio-gender-male')).toBeChecked
  await page.getByTestId('btn-personal-submit').click()
  //F03
  await page.getByTestId('select-country').selectOption({label:"India"})
  await page.getByTestId('input-city').fill('buston')
  await page.getByRole('textbox', { name: 'About You optional · no testid' }).fill("étudiant en master stds")
  const about_me=page.getByRole('textbox', { name: 'About You optional · no testid' })
  const city=page.getByTestId('input-city')
  const country=page.getByTestId('select-country')
  await expect(about_me).toHaveValue("étudiant en master stds")
  await expect(country.locator('option:checked')).toHaveText('India')
  await expect(city).toHaveValue("buston")
  //F04
  const selenium=page.getByTestId('checkbox-group-interests').getByText('Selenium')
  const playwright=page.getByTestId('checkbox-group-interests').getByText('Playwright')
  await selenium.check()
  await playwright.check()
  await expect(selenium).toBeChecked()
  await expect(playwright).toBeChecked()
  await page.getByTestId('btn-interests-submit').click()
  //challenge
  const champ=page.getByTestId('input-password')
  await champ.fill("123456")
  await expect(champ).toHaveValue(/^.{6,}$/)
  await page.getByTestId('input-confirm-password').fill("123456")
  await expect(page.getByTestId('input-confirm-password')).toHaveValue("123456")
  await page.getByTestId('checkbox-terms').check()
  await expect(page.getByTestId('checkbox-terms')).toBeChecked
  await page.getByTestId('submit-form-btn').click
  
});
test('dropdown Automation Practice', async ({ page }) => {
  //F01
  await page.getByTestId('new-practice-card-dropdowns').click()
  await page.getByTestId('fruit-select').selectOption({label:"Apple"})
  await expect(page.getByTestId('result-s01')).toHaveText("Selected fruit: Apple")
  //F02
  await page.getByTestId('country-select').selectOption({value:"argentina"})
  await expect(page.getByTestId('country-select')).toHaveValue("argentina")
  //F03
  const liste = page.getByTestId('language-select')
  const libelles = await liste.locator('option').allTextContents()
  console.log(libelles)                       // [ 'Python', 'Java', 'JavaScript', 'TypeScript' ]
  const dernierIndex = libelles.length - 1
  console.log(dernierIndex)                   // 3
  await liste.selectOption({ index: dernierIndex })
  await page.getByRole('button', { name: 'Select last programming' }).click()
  await expect(page.getByTestId('language-select')).toHaveValue("typescript")
  //F04
  await page.getByTestId("hero-select").selectOption({value:"batman"})
  await expect(page.getByTestId("result-s04")).toHaveText("Selected heroes: Batman")
  //F05
  const city = page.getByRole('combobox', { name: 'City' })

  await city.fill('Pune')
  await page.getByRole('option', { name: 'Pune' }).click()
  await expect(page.getByTestId('result-s06')).toHaveText('City selected: Pune (city-pune)')
  
});

})






