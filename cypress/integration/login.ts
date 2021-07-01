describe('Log in successfully', () => {
  it('Visits the Login Page, logs in, and logs out', () => {
    cy.visit('http://localhost:3000');
    cy.get('button').should('be.disabled');
    cy.fixture('user.json')
      .as('userData')
      .then((userData) => {
        cy.get('input[type="text"]').focus().type(userData.username);
        cy.get('input[type="password"]').focus().type(userData.password);
      });
    cy.get('button').should('be.enabled').click();

    cy.url().should('include', '/gallery');
    cy.contains('Hi, bret!');
    cy.get('button').click();
    cy.url().should('include', '/');
  });
});

describe('Not allow a logged out user to visit Gallery', () => {
  it('Visits the Login Page, Logs out, and tries to access Gallery again', () => {
    cy.visit('http://localhost:3000');
    cy.get('button').should('be.disabled');
    cy.fixture('user.json')
      .as('userData')
      .then((userData) => {
        cy.get('input[type="text"]').focus().type(userData.username);
        cy.get('input[type="password"]').focus().type(userData.password);
      });
    cy.get('button').should('be.enabled').click();

    cy.url().should('include', '/gallery');
    cy.get('button').click();
    cy.url().should('include', '/');

    cy.visit('http://localhost:3000/gallery');
    cy.url().should('eq', 'http://localhost:3000/');
  });
});
