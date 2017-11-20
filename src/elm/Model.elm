module Model exposing (..)

import Date exposing (Date)


type VictimType = Injured | Killed


-- D3 payload
-- @todo from API
type alias Filter = {
  victimTypes : List VictimType,
  years : List Int  -- @todo limit this to 2014-2017
}


-- @todo from API
type State = GA | LA | MN


type alias Record = {
  date : Date,
  injured : Int,
  killed : Int,
  state : State
}


type alias Model = {
  filter : Filter,
  records : List Record
}


initialFilter : Filter
initialFilter = { victimTypes = [ Killed ], years = [ 2017 ] }


demoRecords : List Record
demoRecords =
  let
    date = case Date.fromString("November 18, 2017") of
      Ok d -> d
      Err e -> Date.fromTime 0
  in
    [ Record date 4 0 MN ]
