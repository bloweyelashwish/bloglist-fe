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

    describe('Login', function () {
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

    describe('when logged in', function() {
        beforeEach(function() {
            cy.login({ username: 'testusername', password: 'test' })
        })

        it('A blog can be created', function() {
            cy.contains('new note').click()
            cy.get('#input-title').type('title with cypress')
            cy.get('#input-author').type('author with cypress')
            cy.get('#input-url').type('url with cypress')
            cy.contains('create').click()

            cy.contains("title with cypress")
        })

        it('a blog can be liked', function () {
            cy.contains('new note').click()
            cy.get('#input-title').type('title with cypress')
            cy.get('#input-author').type('author with cypress')
            cy.get('#input-url').type('url with cypress')
            cy.contains('create').click()

            cy.contains('view').click()
            cy.contains('like').click()
        })
    })

})
