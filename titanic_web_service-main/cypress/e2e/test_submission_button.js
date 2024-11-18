describe('Testing the Submission Button', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/calculator');
    cy.get('form').should('be.visible');
  });

  it('Should submit the form with all the chosen predictions', () => {
    cy.get('#Title').click();
    cy.get('li[data-value="Mr"]').click();
    cy.get('#Pclass').click();
    cy.get('li[data-value="First"]').click();
    cy.get('#Sex').click();
    cy.get('li[data-value="Male"]').click();
    cy.get('input[name="Age"]').type('30');
    cy.get('input[name="Fare"]').type('100');
    cy.get('#Embarked').click();
    cy.get('li[data-value="Southhampton"]').click();
    cy.get('input[name="IsAlone"]').check();

    cy.get('input[name="random_forest"]').check();
    cy.get('input[name="decision_tree"]').check();
    cy.get('input[name="knn"]').check();

    cy.get('button[type="submit"]').click();

    cy.contains('.flex .justify-between', 'Predictions').should('be.visible');
    cy.contains('.flex .justify-between', 'Random Forest').should('be.visible');
    cy.contains('.flex .justify-between', 'Decision Tree').should('be.visible');
    cy.contains('.flex .justify-between', 'K-Nearest Neighbors').should('be.visible');
  });
});
