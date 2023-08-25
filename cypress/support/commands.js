Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Jean')
    cy.get('#lastName').type('Anjos')
    cy.get('#email').type('jeanlanjos@gmail.com')
    cy.get('#open-text-area').type('TESTE')
    cy.contains('Enviar').click()
})