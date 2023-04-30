Feature: A user identifies in LoMap

Scenario: The user is a owner of a Pod
  Given An user with a pod
  When I select the Pod provider and LogIn in the provider
  Then You go to the home page in LoMap