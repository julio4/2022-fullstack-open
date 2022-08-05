describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.createUser({
      name: 'Mat Luk',
      username: 'mat',
      password: 'mtlk'
    })
  })

  it('Login form is shown', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Login')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.visit('http://localhost:3000')
      cy.get('#username').type('mat')
      cy.get('#password').type('mtlk')
      cy.get('#login-button').click()

      cy.contains('Mat Luk logged-in')
    })

    it('fails with wrong credentials', function() {
      cy.visit('http://localhost:3000')
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

  describe('Login', function() {
    beforeEach(function() {
      cy.login({
        username: 'mat',
        password: 'mtlk'
      })
    })

    it('A blog can be created', function() {
      cy.visit('http://localhost:3000')
      cy.contains('create new blog').click()

      cy.get('#title').type('My title')
      cy.get('#author').type('Luk')
      cy.get('#url').type('matluk.com')
      cy.get('#create-blog-button').click()

      cy.contains('My title by Luk')
    })

    describe('And with posts', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'Blog 1',
          author: 'blogger',
          url: 'url1'
        })
        cy.createBlog({
          title: 'Blog 2',
          author: 'blogger',
          url: 'url2'
        })
      })

      it('User can like a post', function() {
        cy.visit('http://localhost:3000')
        cy.contains('Blog 2').parent().as('blog-div')

        cy.get('@blog-div').find('button').click()
        cy.get('@blog-div').contains('0')
        cy.get('@blog-div').contains('like').click()

        cy.get('@blog-div').contains('1')
      })

      it('User can delete his blog', function() {
        cy.visit('http://localhost:3000')
        cy.contains('Blog 2').parent().as('blog-div')

        cy.get('@blog-div').find('button').click()
        cy.get('@blog-div').contains('delete').click()

        cy.get('html').should('not.contain', 'Blog 2')
      })

      it('Blogs are ordered by likes descending', function() {
        cy.createBlog({
          title: 'Blog 3',
          author: 'blogger',
          url: 'url3',
          likes: 10
        })

        cy.visit('http://localhost:3000')
        cy.get('.blog-post').eq(0).should('contain', 'Blog 3')
        cy.get('.blog-post').eq(1).should('contain', 'Blog 1')
      })
    })
  })
})
