Feature: A user in LoMap tries to create a new map

Scenario: The user wants to create a new map
  Given An user in LoMap
  When I select the Opciones -> Nuevo mapa
  Then I can type the name of the new map