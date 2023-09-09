import booking from '../fixtures/booking.json'

context('Network Requests', () => {
  describe('POST - Create booking', () => {
    it('API Call - POST', () => {
      cy.request({
        method: 'POST',
        url: 'https://restful-booker.herokuapp.com/booking',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: booking
        }).then((response) => {
          expect(response.status).to.eq(200)
          expect(response.body).to.have.property('bookingid')
          expect(response.body).to.have.property('booking')
          expect(response.body.booking).to.have.property('firstname', booking.firstname)
          expect(response.body.booking).to.have.property('lastname', booking.lastname)
          expect(response.body.booking).to.have.property('totalprice', booking.totalprice)
          expect(response.body.booking).to.have.property('depositpaid', booking.depositpaid)
          expect(response.body.booking).to.have.property('bookingdates')
          expect(response.body.booking).to.have.property('additionalneeds', booking.additionalneeds)

          cy.log(JSON.stringify(response))
          cy.log('Booking id created: ' + response.body.bookingid)
          Cypress.env('bookingId', response.body.bookingid)
        })
    })
  })
  describe('GET - Get created booking', () => {
    it('API Call - GET', () => {
      cy.request({
        method: 'GET',
        url: 'https://restful-booker.herokuapp.com/booking/' + Cypress.env('bookingId'),
        headers: {
          'Accept': 'application/json'
        }
        }).then((response) => {
          expect(response.status).to.eq(200)
          expect(response.body).to.have.property('firstname', booking.firstname)
          expect(response.body).to.have.property('lastname', booking.lastname)
          expect(response.body).to.have.property('totalprice', booking.totalprice)
          expect(response.body).to.have.property('depositpaid', booking.depositpaid)
          expect(response.body).to.have.property('bookingdates')
          expect(response.body).to.have.property('additionalneeds', booking.additionalneeds)

          cy.log(JSON.stringify(response))
        })
    })
  })
context('Authentication required', () => {
  beforeEach(() => {
    cy.obtainToken(Cypress.env('authUser'), Cypress.env("authPassword"))
  })
  describe('PUT - Update first name, deposit status and additional needs', () => {
    it('API Call - PUT', () => {
      cy.request({
        method: 'PUT',
        url: 'https://restful-booker.herokuapp.com/booking/' + Cypress.env('bookingId'),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Cookie': 'token= ' + window.localStorage.getItem('authToken')
        },
        body: {
          'firstname' : 'Elizabeth',
          'lastname' : 'Gibbons',
          'totalprice' : 50,
          'depositpaid' : false,
          "bookingdates" : {
          'checkin' : '2023-04-01',
          'checkout' : '2023-05-01'
          },
          'additionalneeds' : 'Vegan'
          }
         }).then((response) => {
           expect(response.status).to.eq(200)
           expect(response.body).to.have.property('firstname', 'Elizabeth')
           expect(response.body).to.have.property('lastname', booking.lastname)
           expect(response.body).to.have.property('depositpaid', false)
           expect(response.body).to.have.property('totalprice', booking.totalprice)
           expect(response.body).to.have.property('bookingdates')
           expect(response.body).to.have.property('additionalneeds', 'Vegan')

           cy.log(JSON.stringify(response))
         })
    })
  })
  describe('DELETE - Delete existing booking', () => {
    it('API Call - DELETE', () => {
      cy.request({
        method: 'DELETE',
        url: 'https://restful-booker.herokuapp.com/booking/' + Cypress.env('bookingId'),
        headers: {
          'Content-Type': 'application/json',
          'Cookie': 'token= ' + window.localStorage.getItem('authToken')
          }
        }).then((response) => {
           expect(response.status).to.eq(201)

           cy.log(JSON.stringify(response))
        })
    })
  })
})
})