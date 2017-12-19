module Subscriptions exposing (init)

import D3 exposing (categoriesInit, selectedState, yearsInit)
import Message exposing (Msg(InitCategories, InitYears, SelectState))
import Model exposing (Model)


init : Model -> Sub Msg
init model =
  Sub.batch [ categoriesInit InitCategories, selectedState SelectState, yearsInit InitYears ]
