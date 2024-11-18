describe('Testing the main page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080');
  });

  it('Should navigate to /calculator when "Calculator" button is clicked', () => {
    cy.contains('Calculator').click();
    cy.url().should('include', '/calculator');
  });

  it('Should navigate to /calculator when "Go to the calculator" button is clicked', () => {
    cy.contains('Go to the calculator').click();
    cy.url().should('include', '/calculator');
  });
});
