describe('Blog app', function() {
  beforeEach(function() {
      cy.request('POST', 'http://localhost:3002/api/testing/reset')
      const user = {
          name: 'Test user',
          username: 'testusername',
          password: 'test'
      }
      cy.request('POST', 'http://localhost:3002/api/users/', user)
      cy.visit('http://localhost:3000')
    })

  it('login form is shown', function() {
    cy.contains('log in')
  })

    it('success with correct creds', function() {
        cy.get('#username').type('testusername')
        cy.get('#password').type('test')
        cy.get('#login-button').click()
        cy.get('#logout-btn').click()
    })
    it('fails with wrong creds', function() {
        cy.get('#username').type('testusername')
        cy.get('#password').type('test123')
        cy.get('#login-button').click()
    })
})
