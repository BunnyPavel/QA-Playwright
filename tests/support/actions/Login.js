const {expect} = require('@playwright/test')

export class Login {

    constructor(page) {
        this.page = page
    }

async visit(){
    await this.page.goto('http://localhost:3000/admin/login')
    const loginform = this.page.locator('.login-form')
    await expect(loginform).toBeVisible()
}

async submit(email, password){
    await this.page.getByPlaceholder('E-mail').fill(email)
    await this.page.getByPlaceholder('Senha').fill(password)
    //await this.page.locator('//button[text()="Entrar"]').click()
    await this.page.getByText('Entrar').click()

    //await expect(this.page.getByRole('http://localhost:3000/admin/movies')).toBeVisible()
}

async alertHaveText(text) {
    const alert = this.page.locator('span[class$=alert]')
    await expect(alert).toHaveText(text)

}

async alertPasswordHaveText(text) {
    const alert = this.page.locator('.password-alert')
    await expect(alert).toHaveText(text)

}

async isLoggedIn(username) {
//   const logoutLink = this.page.locator('a[href="/logout"]')
//   await expect(logoutLink).toBeVisible()   << outra maneira de verificar se o usuário está logado
//   await this.page.waitForLoadState("networkidle"); //espera a página carregar completamente, ou seja, quando não houver mais requisições de rede pendentes
//   await expect(this.page).toHaveURL(/.*admin/); //verifica se a url atual contém a palavra "admin", indicando que o usuário foi redirecionado para a página de administração após o login bem-sucedido

    const loggedUser = this.page.locator('.logged-user')
    await expect(loggedUser).toHaveText(`Olá, ${username}`)
}

async do(email, password, username) {
    await this.visit()
    await this.submit(email, password)
    await this.isLoggedIn(username)
}

}