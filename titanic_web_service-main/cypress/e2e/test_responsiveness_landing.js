describe('Testing responsiveness of the Landing Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080');
  });

  // creating a dictionary with the most common sizes of devices
  const sizes = {
    'iphone-4': { width: 320, height: 480 },
    'iphone-8': { width: 375, height: 667 },
    'iphone-6/7/8 Plus': { width: 414, height: 736 },
    'iphone-x': { width: 375, height: 812 },
    'iphone-xr/11/11-pro-max': { width: 414, height: 896 },
    'samsung-note9': { width: 414, height: 846 },
    'samsung-s10': { width: 360, height: 760 },
    ipad: { width: 768, height: 1024 },
    'ipad-air': { width: 810, height: 1080 },
    'ipad-pro-12.9': { width: 1024, height: 1366 },
    'pixel-2': { width: 411, height: 731 },
    'nexus-5': { width: 360, height: 640 },
    'standard-desktop': { width: 1024, height: 768 },
    'standard-laptop': { width: 1280, height: 800 },
    'full-hd': { width: 1920, height: 1080 },
  };

  // going through each device in the dictionary
  Object.entries(sizes).forEach(([device, size]) => {
    it(`Should display correctly on ${device} screen (${size.width} x ${size.height})`, () => {
      cy.viewport(size.width, size.height);

      cy.get('header').should('be.visible');
      cy.get('header img').should('be.visible');
      cy.get('header a').contains('Calculator').should('be.visible');

      cy.get('.relative .text-center').contains('Titanic Survivor Predictor').should('be.visible');
      cy.get('.relative .text-center').contains('Discover Your Odds of Survival').should('be.visible');
      cy.get('.relative a').contains('Go to the calculator').should('be.visible');

      cy.get('footer').should('be.visible');
      cy.get('footer').contains('Our Team').should('be.visible');
      cy.get('footer').contains('Carpathia').should('be.visible');
      cy.get('footer a').each(link => {
        cy.wrap(link).should('have.attr', 'href');
      });
    });
  });
});
