describe('Urls Homepage', () => {
  const longUrl = 'https://www.google.com/search?q=puppies&source=lmns&bih=821&biw=1440&safe=active&hl=en&sa=X&ved=2ahUKEwjDif_W06PvAhVZPs0KHVNAC1kQ_AUoAHoECAEQAA'

  beforeEach(() => {
    cy
      .fixture('shortened-urls')
      .then(urls => {
        cy.intercept('GET', 'http://localhost:3001/api/v1/urls', { body: urls })
      })

    cy.visit('http://localhost:3000');
  });

  it('Should display the correct header on load', () => {
    cy.get('h1').should('have.text', 'URL Shortener')
  })

  it('Should display existing shortened urls on load', () => {
    cy.get('.url').eq(0).should('contain', 'Test 1')
    cy.get('.url').eq(1).should('contain', 'Test 2')
  })

  it('Should display the urls form on load', () => {
    cy.get('form input[name=title]')
    cy.get('form input[name=long_url]')
    cy.get('form').contains('button', 'Shorten Please!')
  })

  it('Should be able to fill out the form', () => {
    cy.get('form input[name=title]').type('Test 3').should('have.value', 'Test 3')
    cy.get('form input[name=long_url]').type(longUrl).should('have.value', longUrl)
  })

  it('Should be able to add a new shortened URL', () => {
    cy.intercept('POST', 'http://localhost:3001/api/v1/urls', {
        statusCode: 200,
        body: {
          "id": 3,
          "long_url": longUrl,
          "short_url": "http://localhost:3001/useshorturl/4",
          "title": "Test 3",
        }
      })
    cy.get('form input[name=title]').type('Test 3').should('have.value', 'Test 3')
    cy.get('form input[name=long_url]').type(longUrl).should('have.value', longUrl)
    cy.get('button[name="submit"]').click()
    cy.get('.url').contains('Test 3')
  })

  it('Should not be able to submit the form unless all fields have been filled out', () => {
    cy.get('form input[name=title]').type('Test 3').should('have.value', 'Test 3')
    cy.get('form input[name=long_url]')
    cy.get('button[name="submit"]').should('be.disabled')
  })

  it('Should be able to delete a URL', () => {
    cy.intercept('http://localhost:3001/api/v1/urls/4', {statusCode: 204})
    cy.get('.delete-button').eq(1).click()
    cy.get('.url').eq(1).should('not.exist')
  })

})

describe('Server Sad Paths', () => {

  it('Should display an error message when the server returns a 400 error', () => {
  cy
    .intercept('http://localhost:3001/api/v1/urls', {statusCode: 404})
    .visit('http://localhost:3000')
    .get('section').should('have.text', 'Something went wrong with the server. Please refresh the page or try again later')
})

  it('Should display an error message when the server returns a 500 error', () => {
    cy
      .intercept('http://localhost:3001/api/v1/urls', {statusCode: 500})
      .visit('http://localhost:3000')
      .get('section').should('have.text', 'Something went wrong with the server. Please refresh the page or try again later')
  })

})
