port module D3 exposing (newState, update) 

import Date exposing (toTime)
import Json.Encode exposing (Value, encode, float, int, list, object, string)

import Model exposing (..)
import USState exposing (State)


type alias Data = {
  state : State,
  value : Int
}


port newState : String -> Cmd msg


update : Model -> Cmd msg
update model =
  newState ""

--  let
--    records = model.records 
--  in
--    newState <| encodeRecords records
--
--
---- PRIVATE
--
--
--encodeRecord : Record -> Value
--encodeRecord record =
--  object [
--    ("date", float <| toTime record.date),
--    ("injured", int record.injured),
--    ("killed", int record.killed),
--    ("state", string <| toString record.state)]
--
--
--encodeRecords : List Record -> String
--encodeRecords records = encode 0 <| object [
--  ("records", list <| List.map encodeRecord records)]
