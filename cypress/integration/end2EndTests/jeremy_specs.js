import { getMaxListeners } from "cluster";

describe('Visit site', () => {
    it('Visits the login page', function() {
      cy.visit('https://shiftradr.com')
    })
  })

  it('accepts user input for username', () => {
    cy.visit('https://shiftradr.com')
    cy.get('input[type=text]').type(1)
})

it('accepts user input for password', () => {
    cy.visit('https://shiftradr.com')
    cy.get('input[type=password]').type(1)
})

it('inputs both username and password and submits', () => {
    cy.visit('https://shiftradr.com')
    cy.get('input[type=text]').type(1)
    cy.get('input[type=password]').type(1)
    cy.get('.regButton').click()    
})


it('checks for register link', () => {
    cy.visit('https://shiftradr.com')
    cy.get('Link')
    // cy.contains('.borderbottom')
})

it('clicks register link', () => {
    cy.visit('https://shiftradr.com')
    cy.get('Link')
    cy.get('.borderbottom').click()
})