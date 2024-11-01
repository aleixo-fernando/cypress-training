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

    //Testando checkbox
    it(' 05 - Usando checkbox',() =>{
        cy.get('input[type="checkbox"]').check()
        cy.get('#on-off').should('have.text','ON')        
    })

    //Testando radio
    it(' 06 - Usando checkbox',() =>{
        cy.get('input[type="radio"]').check()
        cy.get('#on-off').should('have.text','OFF')        
    })

    it('07 - Select form',()=>{
        cy.get('#selection-type').select('Basic')
        //Selecionando por índice
        cy.get('#selection-type').select(3)
        cy.get('#select-selection').should('contain','VIP')
        var variavel 
        cy.get('#selection-type').find('option:selected').invoke('text').then((text)=>{
            cy.log(text)
            variavel = text
            cy.get('#select-selection').should('have.text',`You've selected: ${variavel}`)
        })
    })

    it('08 - Selecionando arrays',()=>{
        
        let fruits = ["apple", "banana", "cherry"];
        cy.get('select[multiple]').select([`${fruits[0]}`,`${fruits[1]}`,`${fruits[2]}`])
        cy.get('#fruits-paragraph').should('have.text',`You've selected the following fruits: ${fruits[0]}, ${fruits[1]}, ${fruits[2]}`)
    })
    
    it('09 - Upload de arquivos',()=>{
        cy.get('#file-upload').selectFile('cypress/fixtures/example.json')
        cy.get('#file').should('have.text','The following file has been selected for upload: example.json')
    })
})
