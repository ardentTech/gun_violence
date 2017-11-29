module Subscriptions exposing (init)

import D3 exposing (categories, years)
import Message exposing (Msg(InitCategories, InitYears))
import Model exposing (Model)


init : Model -> Sub Msg
init model =
  Sub.batch [ categories InitCategories, years InitYears ]
