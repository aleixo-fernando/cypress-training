//Este é um hook que executa antes dos testes
    beforeEach(() => {
        cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
        cy.visit('https://cypress-playground.s3.eu-central-1.amazonaws.com/index.html')

       })
         

describe('Cypress Playground',() => {

    it('02 - Acessando o site',() =>{

      })

    //Testando formas de clicar em um botão e checando resultado
    it('03 - Clicando em um botão',()=>{
    cy.contains('button','Subscribe').click()
    cy.get('button[type="submit"]').click()
    cy.contains(`You've been successfully subscribed to our newsletter.`)
        })

    //Testando formas de acessar textbox e checando resultado
    it(' 04 - Escrevendo em uma textbox',()=>{
        cy.get('textarea')
        cy.get('#signature-textarea').type('Teste de escrita')
        cy.get('#signature').contains('Teste de escrita')
        })


})
