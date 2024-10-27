//Este é um hook que executa antes dos testes
    beforeEach(() => {
        cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
        cy.visit('https://cypress-playground.s3.eu-central-1.amazonaws.com/index.html')

       })
         

describe('Cypress Playground Aulas',() => {

    it('Realize Login com sucesso',() =>{
      //Teste de Login aqui
    })

    it('Realize Logout com sucesso',() =>
        {
        //Teste de Logout aqui
        })

})
