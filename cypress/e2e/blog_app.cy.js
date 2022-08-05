describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.createUser({
      name: 'Mat Luk',
      username: 'mat',
      password: 'mtlk'
    })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Login')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('mat')
      cy.get('#password').type('mtlk')
      cy.get('#login-button').click()

      cy.contains('Mat Luk logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('ma')
      cy.get('#password').type('mtl')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'logged in')
    })
  })
})
