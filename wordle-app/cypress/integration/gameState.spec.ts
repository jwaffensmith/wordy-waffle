/// <reference types="Cypress" />
import dayjs from 'dayjs';

const timeNow12hours = dayjs().format("hh:mm:ss a");
const todaysDate = dayjs().format("MMM DD, YYYY");
const date = new Date();
const day = date.getDate() + 1
const month = date.getMonth() + 1;
const year = date.getFullYear();

describe('Game State', () => {
    beforeEach('open game', () => {
      cy.visit('localhost:3000')
    });

    it('User\'s progress will maintain after reload until the next day', () => {
      const guesses: string[][] = [
        ["M", "E", "D", "I", "A"],
        ["H", "A", "P", "P", "Y"],
        ["H", "E", "L", "L", "O"],
      ]
      cy.get('.grid').then(tiles => {
        cy.get('.active-tile').each((tile, index) => {
          cy.wrap(tile)
          .type(guesses[0][index])
          .should('have.text', guesses[0][index])
        })
        cy.get('[data-cy="active-tile-4"]').type('{enter}')
      })
      cy.get('.grid').then(tiles => {
        cy.get('.active-tile').each((tile, index) => {
          cy.wrap(tile)
          .type(guesses[1][index])
          .should('have.text', guesses[1][index]);
        })
        cy.get('[data-cy="active-tile-4"]').type('{enter}')
      })
        cy.reload()
        cy.get('#modal').should('contain', 'Game in Progress')
        cy.get('.close-modal').click()
        cy.get('.grid').then(tiles => {
          cy.get('.active-tile').each((tile, index) => {
            cy.wrap(tile)
            .type(guesses[2][index])
            .should('have.text', guesses[2][index]);
          })
          cy.get('[data-cy="active-tile-4"]').type('{enter}')
        })
        cy.log(`Current time and date ${timeNow12hours} - ${todaysDate}`)
        cy.clock(Date.UTC(year, month, day), ['Date'])
        cy.log('changed date to: ' + `${month}/${day}/${year}`)
        // cy.clearLocalStorage()
        cy.reload()
        cy.get('.grid').then(tiles => {
          cy.get('.active-tile')
            .should('be.empty')
            .should('have.length', 5)
            })
          cy.get('.inactive-tile')
            .should('be.empty')
            .should('have.length', 25)
    })
});