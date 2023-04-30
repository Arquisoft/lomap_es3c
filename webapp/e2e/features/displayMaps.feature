Feature: A user identifies in LoMap, and tries to display his friends list

Scenario: The user is a owner of a Pod and he has friends
  Given An user with a pod correctly identified, and with some friends
  When I try to display the friends list
  Then You can see the name of the friends