describe('Urls Homepage', () => {
  const longUrl = 'https://www.google.com/search?q=dinosaur&oq=dinosaur&aqs=chrome.0.0i67i355i433j46i67i433j46j0i67j46j46i131i175i199i433j0i433j0i67j46i433j46.852j0j7&sourceid=chrome&ie=UTF-8'

  beforeEach(() => {
    cy.fixture('shortened-urls')
      .then(urls => {
        cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
          body: urls
        })
      });

    // cy.intercept('POST', 'http://localhost:3001/api/v1/reservations', {
    //   statusCode: 200,
    //   body: {
    //     "id": 18939837,
    //     "name": "Leta",
    //     "date": "12/3",
    //     "time": "6:30",
    //     "number": 2
    //   }
    // })

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

  // it('Should be able to add a new reservation', () => {
  //   cy
  //     .intercept('POST', 'http://localhost:3001/api/v1/reservations', {
  //       statusCode: 200,
  //       body: {
  //         "id": 18939837,
  //         "name": "Test 4",
  //         "date": "12/13",
  //         "time": "6:30",
  //         "number": 2
  //       }
  //     })
  //     .intercept('http://localhost:3001/api/v1/reservations', {fixture: 'mock-resy-data.json'})
  //     .visit('http://localhost:3000')
  //     .get('form input[name=name]').type('Test 4').should('have.value', 'Test 4')
  //     .get('form input[name=date]').type('12/13').should('have.value', '12/13')
  //     .get('form input[name=time]').type('6:30').should('have.value', '6:30')
  //     .get('form input[name=number]').type('2').should('have.value', '2')
  //     .get('.res-button').click()
  //     .get('.card').contains('Test 4')
  // })

})
