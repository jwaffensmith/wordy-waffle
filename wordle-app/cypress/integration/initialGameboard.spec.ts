/// <reference types="Cypress" />

describe('When game starts, user sees a blank wordle board', () => {
  
  beforeEach('open game', () => {
    cy.visit('localhost:3000')
  });
  
  it('Starting gameboard should display 1 active row and 5 inactive rows', () => {
    cy.get('.grid').then(tiles => {
      cy.get('.active-tile').each((tile) => {
        cy.wrap(tile)
        .should('be.empty');
      })
      cy.get('.inactive-tile').each((tile) => {
        cy.wrap(tile)
        .should('be.empty')
      })
    });
  });
  
});
