describe('Testing the statistics part of the Calculator page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/calculator');
  });

  it('Displays loading message when stats are not available', () => {
    cy.get('.chart-container').should('not.exist');
    cy.contains('Loading statistics...').should('exist');
  });

  it('Displays charts when stats are available', () => {
    cy.get('.chart-container', { timeout: 10000 }).should('exist');
    cy.get('.chart-container canvas').should('have.length', 3);
    cy.get('.chart-container')
      .eq(0)
      .within(() => {
        cy.get('canvas').should('exist');
      });
  });
});
