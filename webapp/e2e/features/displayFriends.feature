Feature: A user identifies in LoMap, and tries to display his maps list

Scenario: The user is a owner of a Pod and he has maps
  Given An user with a pod correctly identified, and with some maps
  When I try to display the maps list
  Then You can see the name of the maps