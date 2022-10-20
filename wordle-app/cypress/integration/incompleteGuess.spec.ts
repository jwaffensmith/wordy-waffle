/// <reference types="Cypress" />

describe('Incomplete Guess', () => {
  
    beforeEach('open game', () => {
      cy.visit('localhost:3000')
    });
    
    it('User see\'s message "Not enough letters" when submitting less than 5 letters" ', () => {
        const guess: string[] = ["M", "E", "D"];
        guess.forEach((letter, index) => {
          cy.get(`[data-cy="active-tile-${index}"]`)
          .type(letter)
          .should('have.text', letter)
        })
        cy.get('[data-cy="active-tile-2"]')
        .type('{enter}').
        get('#banner').should('contain', 'Not enough letters')
      
        cy.get('[data-cy="active-tile-3"]')
        .should('be.empty')
        cy.get('[data-cy="active-tile-4"]')
        .should('be.empty')
    })
    
  });
