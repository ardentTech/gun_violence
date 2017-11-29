port module D3 exposing (categories, newState, update, years)

import Json.Encode exposing (..)

import Model exposing (..)


port newState : String -> Cmd msg

port categories : (List String -> msg) -> Sub msg

port years : (List Year -> msg) -> Sub msg


update : Model -> Cmd msg
update model =
  newState <| encode_ model


-- PRIVATE


encode_ : Model -> String
encode_ model =
  encode 0 <| object [
    ("category", string <| Maybe.withDefault "" model.selectedCategory),
    ("year", int <| Maybe.withDefault 0 model.selectedYear)]
