port module D3 exposing (newState, update) 

import Json.Encode exposing (..)

import Model exposing (..)
import USState exposing (State)


port newState : String -> Cmd msg


update : Model -> Cmd msg
update model =
  newState <| encode_ model


-- PRIVATE


encode_ : Model -> String
encode_ model =
  encode 0 <| object [
    ("category", string <| toString model.category),
    ("years", list <| List.map (\y -> int y) model.years)]
