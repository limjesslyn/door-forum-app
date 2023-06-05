/**
 * - Login spec
 *   - should display login page correctly
 *   - should display alert when email is empty
 *   - should display alert when password is empty
 *   - should display alert when email is wrong
 *   - should display alert when password is wrong
 *   - should display alert when email and password are wrong
 *   - should display homepage when email and password are correct
 */

describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5173/');
  });

  it('should display login page correctly', () => {
    // verify shown element
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button')
      .contains(/^Login$/)
      .should('be.visible');
  });

  it('should display alert when email is empty', () => {
    cy.get('button')
      .contains(/^Login$/)
      .click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('Please fill all the field below');
    });
  });

  it('should display alert when password is empty', () => {
    cy.get('input[placeholder="Email"]').type('emailTester');

    cy.get('button')
      .contains(/^Login$/)
      .click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('Please fill all the field below');
    });
  });

  it('should display alert when email is wrong', () => {
    cy.get('input[placeholder="Email"]').type('wrongEmail@test.com');
    cy.get('input[placeholder="Password"]').type('correctPassword');

    cy.get('button')
      .contains(/^Login$/)
      .click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('email or password is wrong');
    });
  });

  it('should display alert when password is wrong', () => {
    cy.get('input[placeholder="Email"]').type('jdoe@dicoding.com');
    cy.get('input[placeholder="Password"]').type('wrongPassword');

    cy.get('button')
      .contains(/^Login$/)
      .click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('email or password is wrong');
    });
  });

  it('should display alert when email and password are wrong', () => {
    cy.get('input[placeholder="Email"]').type('wrongEmail@dicoding.com');
    cy.get('input[placeholder="Password"]').type('wrongPassword');

    cy.get('button')
      .contains(/^Login$/)
      .click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('email or password is wrong');
    });
  });

  it('should display homepage when email and password are correct', () => {
    cy.get('input[placeholder="Email"]').type('jdoe@dicoding.com');
    cy.get('input[placeholder="Password"]').type('johndoe');

    cy.get('button')
      .contains(/^Login$/)
      .click();

    // verify shown element
    cy.get('.header-container').should('be.visible');
    cy.get('button').contains(/^Logout$/).should('be.visible');
  });
});
