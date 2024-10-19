import {test} from "@playwright/test"
import { ProductsPage } from "../page_objects/ProductsPage"
import { Navigation } from "../page_objects/navigation"
import { Checkout } from "../page_objects/Checkout"
import { LoginPage } from "../page_objects/LoginPage"
import { RegisterPage } from "../page_objects/RegisterPage"
import { v4 as uuidv4 } from "uuid"
import { DeliveryDetails } from "../page_objects/DeliveryDetails"
import { PaymentPage } from "../page_objects/PaymentPage"
import { paymentDetail } from "../data/paymentDetail"

test("New user full end-to-end est journey", async ({page}) => {
    const productPage = new ProductsPage(page)
    await productPage.visit()
    await productPage.addProductToBasket(0)
    await productPage.addProductToBasket(1)
    await productPage.addProductToBasket(2)
    const navigation = new Navigation(page)

    await navigation.goToCheckOut()

    const checkout = new Checkout(page)
    await checkout.removeCheapestProduct()
    await checkout.continueToCheckout()
    //await page.pause()

    const login = new LoginPage(page)
    await login.moveToSignup()


    const registerpage = new RegisterPage(page)
    const email = uuidv4() + "@gmail.com"
    const password =uuidv4()
    await registerpage.signUpAsNewUser(email, password)

    const deliveryDetails = new DeliveryDetails(page)
    await deliveryDetails.fillDetails()
    await deliveryDetails.saveDetails()
    await deliveryDetails.continueToPayment()
 

    const paymentPage = new PaymentPage(page)
    await paymentPage.activateDiscount()
    await paymentPage.fillPaymentDetails(paymentDetail)
    await paymentPage.completePayment()

})