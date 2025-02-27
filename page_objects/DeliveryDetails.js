import { DeliveryDetail as userAddress } from "../data/DeliveryDetail"
import { expect } from "@playwright/test"

export class DeliveryDetails {

    constructor(page) {

        this.page = page

        this.firstNameInput = page.locator('[data-qa="delivery-first-name"]')
        this.lastNameInput = page.locator('[data-qa="delivery-last-name"]')
        this.streetInput = page.locator('[data-qa="delivery-address-street"]')
        this.postcodeInput = page.locator('[data-qa="delivery-postcode"]')
        this.cityInput = page.locator('[data-qa="delivery-city"]')
        this.countryDropDown = page.locator('[data-qa="country-dropdown"]')
        this.savedAddressContainer = page.locator('[data-qa="saved-address-container"]')
        this.saveAddressButton = page.getByRole('button', { name: 'Save address for next time' })

    
        

        this.savedAddressFirstName = page.locator('[data-qa="saved-address-firstname"]')
        this.savedAddresslastName = page.locator('[data-qa="saved-address-lastname"]')
        this.savedAddressStreet = page.locator('[data-qa="delivery-address-street"]')
        this.savedAddressPostcode = page.locator('[data-qa="saved-address-postcode"]')
        this.savedAddressCity = page.locator('[data-qa="saved-address-city"]')
        this.savedAddressCountry = page.locator('[data-qa="saved-address-country"]')

        this.continueToPaymentButton = page.getByRole('button', { name: 'Continue to payment' })
      
        
        
        

    }


    fillDetails = async() => {

        await this.firstNameInput.waitFor()
        await this.firstNameInput.fill(userAddress.firstName)
        await this.lastNameInput.waitFor()
        await this.lastNameInput.fill(userAddress.lastName)
        await this.streetInput.waitFor()
        await this.streetInput.fill(userAddress.street)
        await this.postcodeInput.waitFor()
        await this.postcodeInput.fill(userAddress.postCode)
        await this.cityInput.waitFor()
        await this.cityInput.fill(userAddress.City)
        await this.countryDropDown.waitFor()
        await this.countryDropDown.selectOption(userAddress.Country)

    }

    saveDetails = async() => {
        const AddressCountBeforesaving = await this.savedAddressContainer.count()

        await this.saveAddressButton.waitFor()
        await this.saveAddressButton.click()
        await expect(this.savedAddressContainer).toHaveCount(AddressCountBeforesaving + 1)

        // await this.savedAddressFirstName.first().waitFor()
        // expect(await this.savedAddressFirstName.first().innerText()).toBe(await this.firstNameInput.inputValue())

        // await this.savedAddresslastName.first().waitFor()
        // expect(await this.savedAddresslastName.first().innerText()).toBe(await this.lastNameInput.inputValue())

        // await this.savedAddressStreet.first().waitFor()
        // expect(await this.savedAddressStreet.first().innerText()).toBe(await this.streetInput.inputValue())

        // await this.savedAddressPostcode.first().waitFor()
        // expect(await this.savedAddressPostcode.first().innerText()).toBe(await this.postcodeInput.inputValue())

        // await this.savedAddressCity.first().waitFor()
        // expect(await this.savedAddressCity.first().innerText()).toBe(await this.cityInput.inputValue())

        // await this.savedAddressCountry.first().waitFor()
        // expect(await this.savedAddressCountry.first().innerText()).toBe(await this.countryDropDown.inputValue())

    }

    continueToPayment = async() => {
        await this.continueToPaymentButton.waitFor()
        await this.continueToPaymentButton.click()
        await this.page.waitForURL(/\/payment/, {timeout: 3000})

    }

}