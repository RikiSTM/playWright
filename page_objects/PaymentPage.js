import { expect } from "@playwright/test"

export class PaymentPage {

    constructor(page) {
        this.page = page
        this.discountCode = page.frameLocator('[data-qa="active-discount-container"]').locator('[data-qa="discount-code"]')
        this.discountInput = page.getByPlaceholder('Discount code')
        this.activateDiscountButton = page.locator('[data-qa="submit-discount-button"]')
        this.totalValue = page.locator('[data-qa="total-value"]')
        this.discountedValue = page.locator('[data-qa="total-with-discount-value"]')
        this.discountActiveMessage = page.locator('[data-qa="discount-active-message"]')

        this.creditCardOwnerInput = page.getByPlaceholder('Credit Card owner')
        this.creditCardNumberInput = page.getByPlaceholder('Credit Card number')
        this.creditCardValidUntilInput = page.getByPlaceholder('Valid until')
        this.creditCardCVCInput = page.getByPlaceholder('Credit card CVC')

        this.payButton = page.locator('[data-qa="pay-button"]')
    }

    activateDiscount = async() => {
        await this.discountCode.waitFor()
        const code = await this.discountCode.innerText()
        await this.discountInput.waitFor()
        await this.discountInput.fill(code)
        await expect(this.discountInput).toHaveValue(code)


        expect(await this.discountedValue.isVisible()).toBe(false)
        expect(await this.discountActiveMessage.isVisible()).toBe(false)
        
        await this.activateDiscountButton.waitFor()
        await this.activateDiscountButton.click()
        // check that it displays "Discount activated"
        await this.discountActiveMessage.waitFor()
        // check that there is now a discounted price total showing
        await this.discountedValue.waitFor()
        const discountValueText = await this.discountedValue.innerText() // "345$"
        const discountValueOnlyStringNumber = discountValueText.replace("$", "")
        const discountValueNumber = parseInt(discountValueOnlyStringNumber, 10)

        await this.totalValue.waitFor()
        const totalValueText = await this.totalValue.innerText() // "345$"
        const totalValueOnlyStringNumber = totalValueText.replace("$", "")
        const totalValueNumber = parseInt(totalValueOnlyStringNumber, 10)
        // check that the discounted price total is smaller than the regular one
        expect(discountValueNumber).toBeLessThan(totalValueNumber)
    }



    fillPaymentDetails = async(paymentDetail) => {

        await this.creditCardOwnerInput.waitFor()
        await this.creditCardOwnerInput.fill(paymentDetail.owner)

        await this.creditCardNumberInput.waitFor()
        await this.creditCardNumberInput.fill(paymentDetail.number)

        await this.creditCardValidUntilInput.waitFor()
        await this.creditCardValidUntilInput.fill(paymentDetail.validUntil)

        await this.creditCardCVCInput.waitFor()
        await this.creditCardCVCInput.fill(paymentDetail.cvc)

    }

    completePayment = async() => {

        await this.payButton.waitFor()
        await this.payButton.click()
        await this.page.waitForURL(/\/thank-you/, {timeout: 3000})

    }

}