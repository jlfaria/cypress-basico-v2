Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function () {
    cy.get('#firstName').type('Joao')
    cy.get('#lastName').type('Faria')
    cy.get('#email').type('testeemail@gmail.com')
    cy.get('#open-text-area').type('teste')
    cy.contains('button', 'Enviar').click()
})


Cypress.Commands.add('SelectOptionByText', function(){
    cy.get('select').select('YouTube')

})
