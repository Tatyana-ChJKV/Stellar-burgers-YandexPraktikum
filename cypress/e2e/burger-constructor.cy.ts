import {BASE_URL} from "../../src/utils/url";
import {testUrl} from "../../src/utils/test-constants";

const testIngredients = "[data-cy=ingredients]";
const testConstructor = "[data-cy=constructor]";
const testBun = "Ingredient 1";
const testMain = "Ingredient 5";
const testSauce = "Ingredient 7";

describe('dragging of ingredients and opening modal windows works properly', () => {
    beforeEach(function () {
        cy.intercept("GET", `${BASE_URL}/ingredients`, {fixture: "ingredients.json"})
        cy.viewport(1300, 800)
        cy.visit(testUrl)
    })
    it("should drag and drop BunIngredient", function () {
        cy.get(testIngredients)
            .contains(testBun)
            .trigger("dragstart");
        cy.get(testConstructor)
            .trigger("drop");
        cy.get(testConstructor)
            .contains(testBun)
            .should("exist")
    })
    it("should drag and drop MainIngredient", function () {
        cy.get(testIngredients)
            .contains(testMain)
            .trigger("dragstart");
        cy.get(testConstructor)
            .trigger("drop");
        cy.get(testConstructor)
            .contains(testMain)
            .should("exist")
    })
    it("should drag and drop SauceIngredient", function () {
        cy.get(testIngredients)
            .contains(testSauce)
            .trigger("dragstart");
        cy.get(testConstructor)
            .trigger("drop");
        cy.get(testConstructor)
            .contains(testSauce)
            .should("exist")
    })
    it('should open modal with IngredientDetails', function () {
        cy.get(testIngredients)
            .contains(testSauce)
            .click();
    })
    it('should close modal with IngredientDetails', function () {
        cy.get(testIngredients)
            .contains(testMain)
            .click()
            .should("exist");
        cy.get('[data-cy="modalClose"]').click()
            .should("not.exist");
    })
})