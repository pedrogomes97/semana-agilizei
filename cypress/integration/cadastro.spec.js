/// <reference types="cypress" />

let Chance = require('chance');
let chance = new Chance();

context('Cadastro', () => {
    it('Cadastro de usuário no site', () => {
        //rotas
        //POST (aborted) /api/1/databases/userdetails/collections/newtable?apiKey=YEX0M2QMPd7JWJw_ipMB3a5gDddt4B_X
        //POST (aborted) /api/1/databases/userdetails/collections/usertable?apiKey=YEX0M2QMPd7JWJw_ipMB3a5gDddt4B_X
        //GET (aborted) /api/1/databases/userdetails/collections/newtable?apiKey=YEX0M2QMPd7JWJw_ipMB3a5gDddt4B_X
        cy.server();
        cy.route({
            method: 'POST',
            url: '**/api/1/databases/userdetails/collections/newtable?**',
            status: 200,
            response: {}
          }).as('postNewtable');
          
          cy.route({
              method: 'POST', 
              url: '**/api/1/databases/userdetails/collections/usertable?**', 
              status: 200, 
              response: {}
            }).as('postUsertable');
          
          cy.route({
            method: 'GET',
            url: '**/api/1/databases/userdetails/collections/newtable?**',
            status: 200,
            response: {}
            }).as('getNewtable');
        


        cy.visit('Register.html');

        cy.get('input[placeholder="First Name"]').type(chance.first());
        cy.get('input[ng-model^=Last]').type(chance.last());
        cy.get('input[ng-model^=Email]').type(chance.email());
        cy.get('input[ng-model^=Phone]').type(chance.phone({ formatted: false}));

        cy.get('input[value="FeMale"]').check();
        cy.get('input[type="checkbox"]').check('Cricket');
        cy.get('input[type="checkbox"]').check('Hockey');

        cy.get('select#Skills').select('Javascript');
        cy.get('select#countries').select('Argentina');
        cy.get('select#country').select('Australia', {force: true});

        cy.get('select#yearbox').select('1996');
        cy.get('select[ng-model^=monthbox]').select('February');
        cy.get('select#daybox').select('24');
        cy.get('input#firstpassword').type('Agilizei@2020');
        cy.get('input#secondpassword').type('Agilizei@2020');

        //attach file
        cy.get('input#imagesrc').attachFile('imagem-foto.png');
        cy.get('button#submitbtn').click();

        cy.wait('@postNewtable').then((resNewtable) => {
            expect(resNewtable.status).to.eq(200)
        });

        cy.wait('@postUsertable').then((resNewtable) => {
            expect(resNewtable.status).to.eq(200)
        });

        cy.wait('@getNewtable').then((resNewtable) => {
            expect(resNewtable.status).to.eq(200)
        });

        cy.url().should('contain', 'WebTable');
    });
});

// input[placeholder="First Name"]
// input[ng-model^=Last]
// input[ng-model^=Email]
// input[ng-model^=Phones]
// input[value="FeMale"]
// input[type="checkbox"]
// select#Skills
// select#countries
// select#country
// select#yearbox
// select[ng-model^=monthbox]
// select#daybox
// input#firstpassword
// input#secondpassword