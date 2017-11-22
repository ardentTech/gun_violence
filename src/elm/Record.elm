module Record exposing (..)

import Date exposing (Date)
import Dict

import USState exposing (..)


type Category = Injured | Killed


type alias Filter = {
  category : Category,
  years : List Int  -- @todo limit this to 2014-2017
}


type alias Record = {
  date : Date,
  injured : Int,
  killed : Int,
  state : State
}


initialFilter : Filter
initialFilter = { category = Killed, years = [ 2017 ] }


initial : List Record
initial = demoRecords


setCategory : Category -> Filter -> Filter
setCategory c f = { f | category = c }


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
