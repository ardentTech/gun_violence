port module D3 exposing (categoriesInit, newFilter, selectedState, update, yearsInit)

import Json.Encode exposing (..)

import Model exposing (..)


port categoriesInit : (List String -> msg) -> Sub msg

port newFilter : String -> Cmd msg

port selectedState : (String -> msg) -> Sub msg

port yearsInit : (List Year -> msg) -> Sub msg


update : Model -> Cmd msg
update model =
  newFilter <| encode_ model


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
