Feature: Cadastro

    Como usuário, desejo realizar um Cadastro
    Para que possa acessar o sistema

Scenario: Cadastro de novo usuário
    Given que acesso o site
    When informar meus dados
    And salvar
    Then devo ser cadastrado com sucesso



# Given => Contexto
# When => ação executada
# Then => resultado esperado
# And => continuidade do passo anterior