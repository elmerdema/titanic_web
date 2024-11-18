describe('Calculator Form and Prediction History', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/calculator');
    cy.get('form').should('be.visible');
  });

  it('Should firstly submit the form, then display predictions in the history section', () => {
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

    cy.contains('Predictions').should('be.visible');
    cy.contains('Random Forest').should('be.visible');
    cy.contains('Decision Tree').should('be.visible');
    cy.contains('K-Nearest Neighbors').should('be.visible');

    cy.contains('h6', 'Prediction History').should('be.visible');

    // checking if history is updated
    cy.get('.flex.flex-col.space-y-2 .p-4').should('have.length.at.least', 1);
  });
});
