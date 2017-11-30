module Subscriptions exposing (init)

import D3 exposing (categories, selectedState, years)
import Message exposing (Msg(InitCategories, InitYears, SelectState))
import Model exposing (Model)


init : Model -> Sub Msg
init model =
  Sub.batch [ categories InitCategories, selectedState SelectState, years InitYears ]
