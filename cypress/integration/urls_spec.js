describe('Urls Homepage', () => {
  const longUrl = 'https://www.google.com/search?q=puppies&source=lmns&bih=821&biw=1440&safe=active&hl=en&sa=X&ved=2ahUKEwjDif_W06PvAhVZPs0KHVNAC1kQ_AUoAHoECAEQAA'

  beforeEach(() => {
    cy.fixture('shortened-urls')
      .then(urls => {
        cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
          body: urls
        })
      });

    cy.intercept('POST', 'http://localhost:3001/api/v1/urls', {
      statusCode: 200,
      body: {
        "id": 3,
        "long_url": longUrl,
        "short_url": "http://localhost:3001/useshorturl/4",
        "title": "Test 3",
      }
    })

    cy.visit('http://localhost:3000');
  });

  it('Should display the correct header on load', () => {
    cy.get('h1').should('have.text', 'URL Shortener')
  })

  it('Should display existing shortened urls on load', () => {
    cy
      .get('.url').eq(0).should('contain', 'Test 1')
      .get('.url').eq(1).should('contain', 'Test 2')
  })

  it('Should display the urls form on load', () => {
    cy
      .get('form input[name=title]')
      .get('form input[name=long_url]')
      .get('form').contains('button', 'Shorten Please!')
  })

  it('Should be able to fill out the form', () => {
    cy
      .get('form input[name=title]').type('Test 3').should('have.value', 'Test 3')
      .get('form input[name=long_url]').type(longUrl).should('have.value', longUrl)
  })

  it('Should be able to add a new shortened URL', () => {
    cy
      .get('form input[name=title]').type('Test 3').should('have.value', 'Test 3')
      .get('form input[name=long_url]').type(longUrl).should('have.value', longUrl)
      .get('button').click()
      .get('.url').contains('Test 3')
  })

})
