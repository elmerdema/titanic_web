import { our_team } from './team';

describe('Testing Footer Links', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('When clicked, the hyperlink opens the webpage of Deggendorf Institute of Technology', () => {
    cy.get('footer');
    cy.contains('Deggendorf Institute of Technology').should('have.attr', 'href', 'https://www.th-deg.de/');
  });

  it('When clicked, the hyperlink opens the webpage of the Titanic dataset', () => {
    cy.get('footer');
    cy.contains('Titanic dataset').should('have.attr', 'href', 'https://www.kaggle.com/c/titanic');
  });

  our_team.forEach(member => {
    it(`Should open ${member.name.split(' ')[0]}'s profile page`, () => {
      cy.get('footer').contains(member.name).should('have.attr', 'href', member.href);
    });
  });
});
