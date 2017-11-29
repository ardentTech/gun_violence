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
  let
    defaultCategory = case List.head model.categories of
      Just c -> c
      _ -> ""
    defaultYear = case List.head model.years of
      Just y -> y
      _ -> 0
  in
    encode 0 <| object [
      ("category", string <| Maybe.withDefault defaultCategory model.selectedCategory),
      ("year", int <| Maybe.withDefault defaultYear model.selectedYear)]
