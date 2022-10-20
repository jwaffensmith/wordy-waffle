describe('Waffle API', () => {

    it('POST /check-tiles evaluates guess for tile background colors', () => {
      const evaluations = ["absent", "absent", "present", "correct", "present"];
      cy.request('POST', "http://localhost:5001/api/check-tiles", {
        guess: ["S", "W", "E", "L", "L"]
        }).then((response) => {
          expect(response.status).to.eq(200)
          expect(response).to.have.property('headers')
          expect(response.body.evaluations).to.be.a("array");
          expect(response.body.evaluations).to.have.length(5)
          expect(response.body.evaluations).to.deep.eq(evaluations)
        })
    })

    it('POST /check-guess evaluates guess for validity, win, and loss', () => { 
      cy.request('POST', "http://localhost:5001/api/check-guess", {
        guess: ["S", "W", "E", "L", "L"]
        }).then((response) => {
          expect(response.status).to.eq(200)
          expect(response).to.have.property('headers')
          expect(response.body.isValid).to.eq(true);
          expect(response.body.isWin).to.eq(false);
          expect(response.body.isLoss).to.eq(false);
        })
    })

    it('POST /check-classes evaluates guess for virtual keyboard classes', () => { 
      cy.request('POST', "http://localhost:5001/api/check-classes", {
        guess: ["S", "W", "E", "L", "L"]
        }).then((response) => {
          expect(response.status).to.eq(200)
          expect(response).to.have.property('headers')
          expect(response.body.correctLetters).to.have.length(1);
          expect(response.body.presentLetters).to.have.length(2);
          expect(response.body.absentLetters).to.have.length(2);
        })
    })

  })