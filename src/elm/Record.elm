module Record exposing (..)

import Date exposing (Date)
import Dict

import USState exposing (..)


type alias Record = {
  date : Date,
  injured : Int,
  killed : Int,
  state : State
}


init : List Record
init = demoRecords


demoRecords : List Record
demoRecords =
  let
    timestamp s = case Date.fromString(s) of
      Ok d -> d
      Err e -> Date.fromTime 0
  in
    [
      Record (timestamp "November 18, 2017") 4 0 MN,
      Record (timestamp "November 17, 2017") 4 0 LA,
      Record (timestamp "December 31, 2016") 2 2 GA
    ]


--categoryMap = Dict.fromList [
--  ()]
