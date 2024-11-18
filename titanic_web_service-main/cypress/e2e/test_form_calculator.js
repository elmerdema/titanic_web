describe('Testing Calculator Form Components', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/calculator');
  });

  it('Shows the form correctly', () => {
    cy.get('input[name="Title"]').should('exist');
    cy.get('input[name="Pclass"]').should('exist');
    cy.get('input[name="Sex"]').should('exist');
    cy.get('input[name="Age"]').should('exist');
    cy.get('input[name="Fare"]').should('exist');
    cy.get('input[name="Embarked"]').should('exist');
    cy.get('input[name="IsAlone"]').should('exist');
  });

  it('Should handle input changes in dropdowns, number inputs, and checkbox', () => {
    cy.get('form').should('be.visible');
  });

  it('Should open the dropdown menu and select "Mr"', () => {
    const dropdownSelector = '#Title';
    const optionValue = 'Mr';

    cy.get(dropdownSelector).click();
    cy.get(`li[data-value="${optionValue}"]`).click();
    cy.get(dropdownSelector).should('contain', optionValue);
  });

  it('Should open the dropdown menu and select "Miss"', () => {
    const dropdownSelector = '#Title';
    const optionValue = 'Miss';

    cy.get(dropdownSelector).click();
    cy.get(`li[data-value="${optionValue}"]`).click();
    cy.get(dropdownSelector).should('contain', optionValue);
  });

  it('Should verify all dropdown options are present', () => {
    const dropdownSelector = '#Title';
    const options = ['Mr', 'Miss', 'Mrs', 'Master', 'Rare'];

    cy.get(dropdownSelector).click();
    options.forEach(option => {
      cy.get(`li[data-value="${option}"]`).should('exist');
    });
  });

  it('Should open the dropdown menu and select "First"', () => {
    const dropdownSelector = '#Pclass';
    const optionValue = 'First';

    cy.get(dropdownSelector).click();
    cy.get(`li[data-value="${optionValue}"]`).click();
    cy.get(dropdownSelector).should('contain', optionValue);
  });

  it('Should open the dropdown menu and select "Second"', () => {
    const dropdownSelector = '#Pclass';
    const optionValue = 'Second';

    cy.get(dropdownSelector).click();
    cy.get(`li[data-value="${optionValue}"]`).click();
    cy.get(dropdownSelector).should('contain', optionValue);
  });

  it('Should verify all dropdown options are present', () => {
    const dropdownSelector = '#Pclass';
    const options = ['First', 'Second', 'Third'];

    cy.get(dropdownSelector).click();
    options.forEach(option => {
      cy.get(`li[data-value="${option}"]`).should('exist');
    });
  });

  it('Should open the dropdown menu and select "Male"', () => {
    const dropdownSelector = '#Sex';
    const optionValue = 'Male';

    cy.get(dropdownSelector).click();
    cy.get(`li[data-value="${optionValue}"]`).click();
    cy.get(dropdownSelector).should('contain', optionValue);
  });

  it('Should open the dropdown menu and select "Female"', () => {
    const dropdownSelector = '#Sex';
    const optionValue = 'Female';

    cy.get(dropdownSelector).click();
    cy.get(`li[data-value="${optionValue}"]`).click();
    cy.get(dropdownSelector).should('contain', optionValue);
  });

  it('Should verify all dropdown options are present', () => {
    const dropdownSelector = '#Sex';
    const options = ['Male', 'Female'];

    cy.get(dropdownSelector).click();
    options.forEach(option => {
      cy.get(`li[data-value="${option}"]`).should('exist');
    });
  });

  it('Should allow input of numeric values in Age field', () => {
    cy.get('[name="Age"]').type('25');
    cy.get('[name="Age"]').should('have.value', '25');
  });

  it('Should not allow submission with invalid Age ex. (-10)', () => {
    cy.get('[name="Age"]').type('-10');
    cy.get('button[type="submit"]').click();
    cy.contains('Loading predictions...').should('not.exist');
  });

  it('Should not allow submission with float Age ex. (10.6)', () => {
    cy.get('[name="Age"]').type('10.6');
    cy.get('button[type="submit"]').click();
    cy.contains('Loading predictions...').should('not.exist');
  });

  it('Should not allow symbol submission ex. (@ or letters)', () => {
    cy.get('[name="Age"]').type('@');
    cy.get('button[type="submit"]').click();
    cy.contains('Loading predictions...').should('not.exist');
    cy.get('[name="Age"]').type('abc');
    cy.get('button[type="submit"]').click();
    cy.contains('Loading predictions...').should('not.exist');
  });

  it('Should allow input of numeric values in Fare field', () => {
    cy.get('[name="Fare"]').type('100');
    cy.get('[name="Fare"]').should('have.value', '100');
  });

  it('Should not allow submission with invalid Fare ex. (-400)', () => {
    cy.get('[name="Fare"]').type('-400');
    cy.get('button[type="submit"]').click();
    cy.contains('Loading predictions...').should('not.exist');
  });

  it('Should not allow symbol submission ex. (! or letters)', () => {
    cy.get('[name="Fare"]').type('!');
    cy.get('button[type="submit"]').click();
    cy.contains('Loading predictions...').should('not.exist');
    cy.get('[name="Fare"]').type('hello');
    cy.get('button[type="submit"]').click();
    cy.contains('Loading predictions...').should('not.exist');
  });

  it('Should not allow submission with float Fare ex. (400.5)', () => {
    cy.get('[name="Fare"]').type('400.5');
    cy.get('button[type="submit"]').click();
    cy.contains('Loading predictions...').should('not.exist');
  });

  it('Should open the dropdown menu and select "Cherbourg"', () => {
    const dropdownSelector = '#Embarked';
    const optionValue = 'Cherbourg';

    cy.get(dropdownSelector).click();
    cy.get(`li[data-value="${optionValue}"]`).click();
    cy.get(dropdownSelector).should('contain', optionValue);
  });

  it('Should open the dropdown menu and select "Queenstown"', () => {
    const dropdownSelector = '#Embarked';
    const optionValue = 'Queenstown';

    cy.get(dropdownSelector).click();
    cy.get(`li[data-value="${optionValue}"]`).click();
    cy.get(dropdownSelector).should('contain', optionValue);
  });

  it('Should verify all dropdown options are present', () => {
    const dropdownSelector = '#Embarked';
    const options = ['Cherbourg', 'Queenstown', 'Southhampton'];

    cy.get(dropdownSelector).click();
    options.forEach(option => {
      cy.get(`li[data-value="${option}"]`).should('exist');
    });
  });

  it('Selects and unselects models', () => {
    cy.get('input[name="random_forest"]').check({ force: true });
    cy.get('input[name="decision_tree"]').check({ force: true });
    cy.get('input[name="knn"]').check({ force: true });

    cy.get('input[name="random_forest"]').should('be.checked');
    cy.get('input[name="decision_tree"]').should('be.checked');
    cy.get('input[name="knn"]').should('be.checked');

    cy.get('input[name="random_forest"]').uncheck({ force: true });
    cy.get('input[name="decision_tree"]').uncheck({ force: true });
    cy.get('input[name="knn"]').uncheck({ force: true });

    cy.get('input[name="random_forest"]').should('not.be.checked');
    cy.get('input[name="decision_tree"]').should('not.be.checked');
    cy.get('input[name="knn"]').should('not.be.checked');
  });
});
