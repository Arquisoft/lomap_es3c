Feature: A user in LoMap tries to send a new friend solicitude

Scenario: The user wants to end a new friend solicitude
  Given An user in LoMap
  When I select the Opciones -> Nuevo amigo
  Then I can type the name of new friend