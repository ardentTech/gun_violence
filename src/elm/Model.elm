module Model exposing (..)

import Date exposing (Date)


type Category = Injured | Killed


type alias Filter = {
  category : Category,
  years : List Int  -- @todo limit this to 2014-2017
}


setCategory : Category -> Filter -> Filter
setCategory c f = { f | category = c }


-- @todo from API?
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
initialFilter = { category = Killed, years = [ 2017 ] }


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
