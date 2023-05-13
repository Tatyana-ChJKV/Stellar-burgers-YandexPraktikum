import {BASE_URL} from "../../src/utils/url";

describe('dragging of ingredients and opening modal windows works properly', () => {
    beforeEach(function () {
        cy.intercept("GET", `${BASE_URL}/ingredients`, {fixture: "ingredients.json"})
        cy.viewport(1300, 800)
        cy.visit("localhost:3000")
    })
    it("should drag and drop BunIngredient", function () {
        cy.get("[data-cy=ingredients]")
            .contains("Ingredient 5")
            .trigger("dragstart");
        cy.get("[data-cy=constructor]")
            .trigger("drop");
        cy.get("[data-cy=constructor]")
            .contains("Ingredient 5")
            .should("exist")
    })
    it("should drag and drop SauceIngredient", function () {
        cy.get("[data-cy=ingredients]")
            .contains("Ingredient 1")
            .trigger("dragstart");
        cy.get("[data-cy=constructor]")
            .trigger("drop");
        cy.get("[data-cy=constructor]")
            .contains("Ingredient 1")
            .should("exist")
    })
    it("should drag and drop MainIngredient", function () {
        cy.get("[data-cy=ingredients]")
            .contains("Ingredient 9")
            .trigger("dragstart");
        cy.get("[data-cy=constructor]")
            .trigger("drop");
        cy.get("[data-cy=constructor]")
            .contains("Ingredient 9")
            .should("exist")
    })
    it('should open modal with IngredientDetails', function () {
        cy.get("[data-cy=ingredients]")
            .contains('Ingredient 7')
            .click();
    })
    it('should close modal with IngredientDetails', function () {
        cy.get("[data-cy=ingredients]")
            .contains('Ingredient 12')
            .click()
            .should("exist");
        cy.get('[data-cy="modalClose"]').click()
            .should("not.exist");
    })
})