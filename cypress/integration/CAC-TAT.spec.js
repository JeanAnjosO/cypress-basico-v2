/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {

    beforeEach(() => {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {        
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {
        const longText = 'Exercicio aula 2, Exercicio aula 2, Exercicio aula 2, Exercicio aula 2, Exercicio aula 2, Exercicio aula 2, Exercicio aula 2, Exercicio aula 2, Exercicio aula 2, Exercicio aula 2, Exercicio aula 2, Exercicio aula 2'
        
        cy.clock()

        cy.get('#firstName').type('Jean')
        cy.get('#lastName').type('Anjos')
        cy.get('#email').type('jeanlanjos@gmail.com')
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.contains('Enviar').click()
        
        cy.get('.success').should('be.visible')
        cy.tick(3000)
        cy.get('.success').should('not.be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
      
        cy.clock()

        cy.get('#firstName').type('Jean')
        cy.get('#lastName').type('Anjos')
        cy.get('#email').type('jeanlanjosgmail.com')
        cy.get('#open-text-area').type('teste')
        cy.contains('Enviar').click()

        cy.get('.error').should('be.visible')
        cy.tick(3000)
        cy.get('.error').should('not.be.visible')
    })

    it('campo de telefone continua ao vazio ao digitar não-numérico', function(){
        cy.get('#phone')
          .type('Anjos')
          .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('Jean')
        cy.get('#lastName').type('Anjos')
        cy.get('#email').type('jeanlanjos@gmail.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('teste')
        cy.contains('Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName')
          .type('Jean')
          .should('have.value', 'Jean')
          .clear()
          .should('have.value', '')
        cy.get('#lastName')
          .type('Anjos')
          .should('have.value', 'Anjos')
          .clear()
          .should('have.value', '')
        cy.get('#email')
          .type('jeanlanjos@teste.com')
          .should('have.value', 'jeanlanjos@teste.com')
          .clear()
          .should('have.value', '')
        cy.get('#phone')
          .type('31999999999')
          .should('have.value', '31999999999')
          .clear()
          .should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
      cy.contains('Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('envia o formulario com sucesso usando comando customizado', function(){
      cy.fillMandatoryFieldsAndSubmit()

      cy.get('.success').should('be.visible')
    })

    it('seleciona produto youtube', function(){
      cy.get('#product')
        .select('YouTube')
        .should('have.value', 'youtube')

    })

    it('seleciona produto mentoria por seu value', function(){
      cy.get('#product')
        .select('mentoria')
        .should('have.value', 'mentoria')
    })

    it('seleciona produto blog por seu indice', function(){
      cy.get('#product')
        .select(1)
        .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "feedback"', function(){
      cy.get('input[type="radio"][value=feedback]')
        .check()
        .should('have.value','feedback')
    })

    it('marca cada tipo de atendimento', function(){
      cy.get('input[type="radio"][value=feedback]')
        .check()
        .should('be.checked')

      cy.get('input[type="radio"][value=ajuda]')
        .check()
        .should('be.checked')

      cy.get('input[type="radio"][value=elogio]')
        .check()
        .should('be.checked')
    })

    it('marca cada tipo de atendimento', function(){
      cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio) {
          cy.wrap($radio).check()
          cy.wrap($radio).should('be.checked')
        })
    })

    it('marca ambos checkboxes, depois desmarca o último', function(){
      cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
    })

    it('selecionando um arquivo da pasta fixture', function(){
      cy.get('input[type="file"]')        
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json')
        .should(function($input){
          expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('selecionando um arquivo simulando um drag-drop', function(){
      cy.get('input[type="file"]')        
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
        .should(function($input){
          expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo utilizando uma fixture com alias', function(){
      cy.fixture('example.json').as('sampleFile')
      cy.get('input[type="file"]')
        .selectFile('@sampleFile')
        .should(function($input){
          expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
      cy.get('a[href="privacy.html"]').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
      cy.get('a[href="privacy.html"]')
        .invoke('removeAttr', 'target')
        .click()

        cy.contains('Política de privacidade').should('be.visible')
    })

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
      cy.get('.success')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain', 'Mensagem enviada com sucesso.')
        .invoke('hide')
        .should('not.be.visible')
      cy.get('.error')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain', 'Valide os campos obrigatórios!')
        .invoke('hide')
        .should('not.be.visible')
    })

    it('preenche a area de texto usando o comando invoke', function(){
      const longText = Cypress._.repeat('Exercicio aula 11', 20)

      cy.get('#open-text-area')
        .invoke('val', longText)
        .should('have.value', longText)
    })

    it('faz uma requisição HTTP', function(){
      cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
        .should(function(response) {
          const {status, statusText, body} = response
          expect(status).to.equal(200)
          expect(statusText).to.equal('OK')
          expect(body).to.include('CAC TAT')
        })
    })

    it.only('encontre o gato escondido', function(){
      cy.get('#cat')
        .invoke('show')
        .should('be.visible')

    })
  })
