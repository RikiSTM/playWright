import { expect } from "@playwright/test";
import { isDesktopViewPort } from "../util/isDesktopViewPort";

export class Navigation {

    constructor(page) {
        this.page = page
        this.basketCounter = page.locator('[data-qa="header-basket-count"]')
        this.checkoutLink = page.getByRole('link', { name: 'Checkout' })
        this.mobileBurgerButton = page.locator('[data-qa="burger-button"]')
    }


    getBasketCount = async () => {
        await this.basketCounter.waitFor()
        const text = await this.basketCounter.innerText()
        return parseInt(text, 10)

    }

    goToCheckOut = async () => {

        if(!isDesktopViewPort(this.page)) {
            await this.mobileBurgerButton.waitFor()
            await this.mobileBurgerButton.click()

        }

        await this.checkoutLink.waitFor()
        await this.checkoutLink.click()
        await this.page.waitForURL("/basket")

    }

}