const { test: base, expect } = require("@playwright/test")

const {LoginPage} = require('../pages/loginPage')
const {Toast} = require('../pages/Components')
const {MoviesPage} = require('../pages/MoviesPage')
const { LandingPage } = require('../pages/LandingPage')


const test = base.extend({
    page: async ({page}, use) => {
        await use({
            ...page, 
            landing: new LandingPage(page),
            login: new LoginPage(page),
            toast: new Toast(page),
            movies: new MoviesPage(page)
        })
    }
})

export { test, expect }