port module D3 exposing (newState, update) 

import Json.Encode exposing (..)

import Category
import Model exposing (..)
import Record exposing (Record)
import USState exposing (State)


-- @todo sum for all states so that there are only 51 records sent to D3
-- @todo filter by year


type alias Data = {
  state : State,
  value : Int
}


port newState : String -> Cmd msg


update : Model -> Cmd msg
update model =
  newState ""




-- PRIVATE


--encodeData : List Data -> String
--encodeData data =
--  let
--    encode_ d = object [
--      ("state", string <| toString d.state),
--      ("value", int d.value)]
--
--  in
--    encode 0 <| list <| List.map encode_ data
