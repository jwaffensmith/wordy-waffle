/// <reference types="Cypress" />

describe('User can update active guess', () => {
    beforeEach('open game', () => {
      cy.visit('localhost:3000')
    });
    it('After a user enters less than 5 letters, user can complete guess', () => {
        const guess: string[] = ["H", "A", "P",];
        guess.forEach((letter, index) => {
          cy.get(`[data-cy="active-tile-${index}"]`)
          .type(letter)
          .should('have.text', letter)
        })
        cy.get('[data-cy="active-tile-3"]').type('{enter}')
        cy.get('#banner').should('contain', 'Not enough letters')
        cy.get('[data-cy="active-tile-3"]').type('p')
        cy.get('[data-cy="active-tile-4"]')
        .type('y')
        .type('{enter}')
    })
    it('When an invalid word is entered, user can delete letters and try a new guess', () => {
        const guess: string[] = ["A", "B", "C", "D", "E"];
        guess.forEach((letter, index) => {
          cy.get(`[data-cy="active-tile-${index}"]`)
          .type(letter)
          .should('have.text', letter)
        })
        cy.get('[data-cy="active-tile-4"]').type('{enter}')
        cy.get('#banner').should('contain', 'Not in word list')
        cy.get('[data-cy="active-tile-4"]').type('{backspace}')
        cy.get('[data-cy="active-tile-3"]').type('{backspace}')
        cy.get('[data-cy="active-tile-2"]')
        .type('{backspace}')
        .type('o')
        cy.get('[data-cy="active-tile-3"]')
        .type('d')   
        cy.get('[data-cy="active-tile-4"]')
        .type('e')
        .type('{enter}')
    })
}) ;