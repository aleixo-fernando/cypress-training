//Este é um hook que executa antes dos testes
    beforeEach(() => {
        const now = new Date(2024, 3, 15) // Os meses iniciam no índice 0, ou seja, 3 é equivalente ao mês de Abril
        cy.clock(now)
        cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
        cy.visit('https://cypress-playground.s3.eu-central-1.amazonaws.com/index.html')
        //Intercept para encontrar erro de API
        cy.intercept('GET', 'https://jsonplaceholder.typicode.com/todos/1', { statusCode: 500 }).as('serverFailure')
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

    it('10 e 11 e 12 - Intercept ',()=>{
        //Vamos interceptar a request e garantir que uma resposta foi emitida
        cy.intercept('GET', 'https://jsonplaceholder.typicode.com/todos/1', { fixture: 'todos' }).as('getTodo')
        cy.contains('button', 'Get TODO').click()
        cy.wait('@getTodo')
        cy.get('#intercept > ul').should('be.visible')
    })

    it(' 14 - Requests ',()=>{
        cy.intercept('GET', 'https://jsonplaceholder.typicode.com/todos/1', { forceNetworkError: true }).as('networkError')
        cy.contains('button', 'Get TODO').click()
        cy.wait('@networkError')
        cy.request('GET','https://jsonplaceholder.typicode.com/todos/1').its('status').should('be.equal', 200)
    })

    //Mexendo com range
    it(' 15 - Range',()=>{ 
        let randomInRange = Math.floor(Math.random() * (10 - 1 + 1)) + 1; // Random integer from min to max
        cy.get('#level').invoke('val',`${randomInRange}`).trigger('change')
        cy.get('#level-paragraph').should('be.visible')
        cy.get('#level-paragraph').should('have.text',`You're on level: ${randomInRange}`)
    })

    //Mexendo com calendário
    it(' 16 - Calendário ',()=>{
        cy.get('#date').type('2024-01-16').blur()
        cy.get('#date-paragraph > strong').should('have.text','2024-01-16')
    })

    //Protegendo arquivos de informações sensíveis
    it('17 - Informações sensíveis',()=>{
        cy.get('#password').type(`${Cypress.env('senha')}`,{log:false})
        cy.get('#show-password-checkbox').check()
        cy.get('#password').should('have.value',Cypress.env('senha'))
    })

    it('19 - Lenght ',()=>{

        cy.get('#animals > li').should('have.length',5)
    })

    //No before each, acertamos uma data nova para o teste
    it('20 - Relógio',() =>{ 
        cy.get('#date-section-paragraph > strong').should('be.visible')
        cy.get('#date-section-paragraph > strong').should('have.text','2024-04-15')
    })

    it('21 - Comando then',()=>{
        cy.get('#timestamp').then(Element =>{
            const valor = Element[0].innerText
            cy.get('#code').type(valor)
        })
        cy.get('form > button').click()
            cy.get('.success').should('be.visible')
    })

    it('22 - Lendo conteúdo de arquivo baixado',()=>{
        cy.contains('a','Download a text file').click()
        cy.readFile('cypress/downloads/example.txt').should('be.equal','Hello, World!')
    })

})
