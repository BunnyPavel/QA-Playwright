const {expect} = require("@playwright/test");

export class MoviesPage {
  constructor(page) {
    this.page = page;
  }

  async isLoggedIn() {
    //const logoutLink = this.page.locator('a[href="/logout"]')
    //await expect(logoutLink).toBeVisible()   << outra maneira de verificar se o usuário está logado

    await this.page.waitForLoadState("networkidle"); //espera a página carregar completamente, ou seja, quando não houver mais requisições de rede pendentes
    await expect(this.page).toHaveURL(/.*admin/); //verifica se a url atual contém a palavra "admin", indicando que o usuário foi redirecionado para a página de administração após o login bem-sucedido
  }

  async create(movie) {
    
    await this.page.locator('a[href$="register"]').click()
   //await this.page.locator('#title').fill(title)
    await this.page.getByLabel('Titulo do filme').fill(movie.title)
    await this.page.getByLabel('Sinopse').fill(movie.overview)
    await this.page.locator('#select_company_id .react-select__indicator').click()

    await this.page.locator('.react-select__option')
    .filter({ hasText: movie.company})
    .click()

    await this.page.locator('#select_year .react-select__indicator').click()

    await this.page.locator('.react-select__option')
    .filter({ hasText: movie.release_year})
    .click()

    await this.page.getByRole('button', { name: 'Cadastrar'}).click()

  }
}
