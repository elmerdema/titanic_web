describe('Testing the "How it works/Input explanation" part of the Calculator page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/calculator');
  });

  it('Should display "How it works" section correctly', () => {
    cy.contains('How it works').should('be.visible');
    cy.contains(
      'Our calculator uses machine learning models to predict the likelihood of surviving the Titanic disaster.',
    ).should('be.visible');
    cy.contains('Input explanation').should('be.visible');
    cy.contains('The calculator requires you to input the following information:').should('be.visible');
    cy.contains('Title (Mr, Mrs, Miss, etc.):').should('be.visible');
    cy.contains('Pclass (1st, 2nd, 3rd):').should('be.visible');
    cy.contains('Sex (Male, Female):').should('be.visible');
    cy.contains('Age:').should('be.visible');
    cy.contains('Fare:').should('be.visible');
    cy.contains('Embarked (Cherbourg, Queenstown, Southampton):').should('be.visible');
    cy.contains('Alone (Yes, No):').should('be.visible');
  });
});
