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
            cy.contains('new note').click()
            cy.get('#input-title').type('post')
            cy.get('#input-author').type('author')
            cy.get('#input-url').type('url')
            cy.contains('create').click()
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
            cy.contains('likes:1')
        })

        it.only('some random cannot delete the post', function () {
            const user = {
                name: "Another User",
                username: "another",
                password: "lol",
            }
            cy.request("POST", "http://localhost:3002/api/users/", user)
            cy.login({ username: "another", password: "lol" })
            cy.contains("view").click()
            cy.get("#blogList").should("not.contain", "remove")
        })
    })

})
