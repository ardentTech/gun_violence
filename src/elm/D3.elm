port module D3 exposing (newState, update) 

import Date exposing (toTime)
import Json.Encode exposing (Value, encode, float, int, list, object, string)

import Model exposing (Record)


port newState : String -> Cmd msg


update : List Record -> Cmd msg
update records =
  newState <| encodeRecords records


-- PRIVATE


encodeRecord : Record -> Value
encodeRecord record =
  object [
    ("date", float <| toTime record.date),
    ("injured", int record.injured),
    ("killed", int record.killed),
    ("state", string <| toString record.state)]


encodeRecords : List Record -> String
encodeRecords records = encode 0 <| object [
  ("records", list <| List.map encodeRecord records)]
