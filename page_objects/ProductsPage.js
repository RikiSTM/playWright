import { expect } from "@playwright/test"
import { Navigation } from "./navigation"
import { isDesktopViewPort } from "../util/isDesktopViewPort"


export class ProductsPage {

    constructor(page) {
        this.page = page
        this.addButton = this.page.locator('[data-qa="product-button"]')
        this.basketCounter = page.locator('[data-qa="header-basket-count"]')
        this.sortDropdown = page.locator('[data-qa="sort-dropdown"]')
        this.productTitle = page.locator('[data-qa="product-title"]')
    }

    visit =  async() => {
        await this.page.goto("/")
    }


    addProductToBasket = async(index) => {
        const specificAddButon = this.addButton.nth(index)
        await specificAddButon.waitFor()
        await expect(specificAddButon).toHaveText("Add to Basket")
        const navigation = new Navigation(this.page)
        //only desktop viewport
        let basketCountBeforeAdding 
        if(isDesktopViewPort(this.page)) {
         basketCountBeforeAdding = await navigation.getBasketCount()
        }
        await specificAddButon.click()
        await expect(specificAddButon).toHaveText("Remove from Basket")

        //only desktop viewport

        if(isDesktopViewPort(this.page)) {
            const basketCountAfterAdding = await navigation.getBasketCount()
            expect (basketCountAfterAdding).toBeGreaterThan(basketCountBeforeAdding)

        }
        
    }


    sortByCheapest = async() => {
        await this.sortDropdown.waitFor()
        await this.productTitle.first().waitFor()
        const productTitleBeforeSorting = this.productTitle.allInnerTexts()
        await this.sortDropdown.selectOption("price-asc")
        const productTitleAfterSorting = this.productTitle.allInnerTexts()
        expect(productTitleBeforeSorting).not.toEqual(productTitleAfterSorting)



    }
}