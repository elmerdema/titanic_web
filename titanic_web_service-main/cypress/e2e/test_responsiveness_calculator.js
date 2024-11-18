describe('Testing responsiveness of the Calculator Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/calculator');
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

  Object.entries(sizes).forEach(([device, size]) => {
    it(`Should display correctly on ${device} (${size.width} x ${size.height})`, () => {
      cy.viewport(size.width, size.height);

      // ensure that all the elements are visible and correctly positioned in the /calculator page
      cy.get('.flex.flex-col.items-center.space-y-8.p-8').should('be.visible');
      cy.get('h2.relative.text-center').contains('Survival Calculator').should('be.visible');
      cy.get('div.flex.flex-col.space-y-4.w-full.md\\:max-w-4xl').should('be.visible');
      cy.get('.grid.grid-cols-1.md\\:grid-cols-2.gap-4').should('be.visible');
      cy.get('.chart-container').should('not.exist');
      cy.contains('Loading statistics...').should('exist');
    });
  });
});
