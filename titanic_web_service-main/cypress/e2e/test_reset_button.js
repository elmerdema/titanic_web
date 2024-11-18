describe('Testing the Reset Button', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/calculator');
  });

  it('Should reset all form fields when the reset button is clicked', () => {
    cy.get('#Title').click();
    cy.get('li[data-value="Mr"]').click();
    cy.get('#Pclass').click();
    cy.get('li[data-value="First"]').click();
    cy.get('#Sex').click();
    cy.get('li[data-value="Male"]').click();
    cy.get('input[name="Age"]').type('30');
    cy.get('input[name="Fare"]').type('100');
    cy.get('#Embarked').click();
    cy.get('li[data-value="Cherbourg"]').click();
    cy.get('input[name="IsAlone"]').check();

    cy.get('input[name="random_forest"]').check();
    cy.get('input[name="decision_tree"]').check();

    cy.get('button').contains('Reset').click();

    cy.get('#Title').should('have.value', '');
    cy.get('#Pclass').should('have.value', '');
    cy.get('#Sex').should('have.value', '');
    cy.get('input[name="Age"]').should('have.value', '');
    cy.get('input[name="Fare"]').should('have.value', '');
    cy.get('#Embarked').should('have.value', '');
    cy.get('input[name="IsAlone"]').should('not.be.checked');

    cy.get('input[name="random_forest"]').should('not.be.checked');
    cy.get('input[name="decision_tree"]').should('not.be.checked');
    cy.get('input[name="knn"]').should('not.be.checked');
    cy.get('input[name="svc"]').should('not.be.checked');
    cy.get('input[name="logreg"]').should('not.be.checked');
  });
});
