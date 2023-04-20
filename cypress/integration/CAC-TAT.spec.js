// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

/// <reference types ="Cypress"/>

describe('Central de Atendimento ao Cliente TAT', function () {
    beforeEach(function () {
        cy.visit('./src/index.html')
    })

    it('verifica o titulo da aplicação', function () {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatrios e envia o formulario', function () {
        const longtext = 'Teste,teste,teste, test, Teste,teste,teste, testT Teste,teste,teste, test, Teste,teste,teste, test este,teste,teste, test, Teste,teste,teste, test'
        cy.get('#firstName').type('Joao')
        cy.get('#lastName').type('Faria')
        cy.get('#email').type('testeemail@gmail.com')
        cy.get('#open-text-area').type(longtext, { delay: 0 })
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    })
    it('exibe mensagem de erro ao submeter o formulario com email invalido', function () {
        cy.get('#firstName').type('Joao')
        cy.get('#lastName').type('Faria')
        cy.get('#email').type('testeemail.com')
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })
    it('verifica se o campo de telefone nao aceita valores nao numericos e se seu valaor continua vazio', function () {
        cy.get('#phone').type('abc')
        cy.get('#phone').should('not.have.value', 'abc')
    })

    it('exibe mensagem de erro quando o telefone esta obrigatorio porem nao é preenchido antes do envio', function () {
        cy.get('#firstName').type('Joao')
        cy.get('#lastName').type('Faria')
        cy.get('#email').type('testeemail@gmail.com')
        cy.get('#open-text-area').type('test')
        cy.get('#phone-checkbox').check()
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })
    it('preenche e limpa os campos nome,sobrenome,email e telefone', function () {
        cy.get('#firstName').type('maria').should('have.value', 'maria').clear().should('have.value', '')
        cy.get('#lastName').type('Faria').should('have.value', 'Faria').clear().should('have.value', '')
        cy.get('#email').type('testeemail@gmail.com').should('have.value', 'testeemail@gmail.com').clear().should('have.value', '')
        cy.get('#phone').type('998299941').should('have.value', '998299941').clear().should('have.value', "")
    })
    it('exibe mensagem de erro quando ao submeter o formulario sem preencher campos obrgitarios', function () {
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })
    it('envia com sucesso o formulario usando um comando customizado', function () {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })
    it('seleciona um produto por seu texto', function () {
        cy.SelectOptionByText()
        cy.get('select').should('have.value', 'youtube')
    })
    it('seleciona um produto Mentoria pelo valor', function () {
        cy.get('#product').select('mentoria').should('have.value', 'mentoria')
    })
    it('selecione o produto Blog pelo seu indice', function () {
        cy.get('#product').select(1).should('have.value', 'blog')
    })
    it('marca o tipo de atendimento Feedback', function () {
        cy.get('input[type="radio"][value="feedback"]').check().should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', function () {
        cy.get('input[type="radio"').each(function ($radio) {
            cy.wrap($radio).check().should('be.checked')
        })

    })
    it('marca as checkboxs', function () {
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')

    })
    it('verifica upload', function () {
        cy.get('input[type="file"]')
            .selectFile('cypress/fixtures/example.json')
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })


    it('seleciona um arquivo simulando drag and drop', function () {
        cy.get('input[type="file"]')
            .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo utilizando uma fixture com alias', function(){
        cy.fixture('example.json').as('TestFile')
        cy.get('input[type="file"]')
        .selectFile('@TestFile')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('verifica pagina de politica de privacidade sem clicar nela', function(){
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('acessa a pagina de politica de privacidade removendo o atributo target',function(){
        cy.get('#privacy a').invoke('removeAttr', 'target').click()
        
        cy.contains('Talking About Testing').should('be.visible')
    })
    it('testando de forma indepentente a pagina de poltiica de privacidade', function(){
        cy.get('#privacy a').invoke('removeAttr', 'target').click()
        cy.contains('h1', 'CAC TAT - Política de privacidade').should('be.visible')

    })
})




