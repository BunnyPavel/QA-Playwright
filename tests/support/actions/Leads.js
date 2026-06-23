const {expect} = require('@playwright/test')

export class Leads {

    constructor(page) {
        this.page = page
    }

  async visit() {
    //visitar a página
    await this.page.goto('/');
  }

  async openLeadModal() {
    //clicar no botão para abrir o modal
    //await page.click('//button[text()="Aperte o play... se tiver coragem"]') << outra maneira de clicar no botão
    await this.page.getByRole("button", { name: /Aperte o play/ }).click();

    await expect(this.page.getByTestId("modal").getByRole("heading")).toHaveText(
      "Fila de espera",
    );
  }

  async submitLeadForm(name, email) {
    //submit o formulário
    //await page.locator('input[name="name"]').fill('bunnypavel4@gmail.com') << outra maneira de preencher o campo name
    await this.page
      .getByPlaceholder("Informe seu nome")
      .fill(name);
    await this.page
      .getByPlaceholder("Informe seu email")
      .fill(email);

    await this.page.getByTestId("modal").getByText("Quero entrar na fila!").click();
  }

  async alertHaveText(target){
    await expect(this.page.locator('.alert')).toHaveText(target)
  }
}
