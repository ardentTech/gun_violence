module Record exposing (..)

import Date exposing (Date)

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
      Record (timestamp "November 14, 2017") 6 12 CA,
      Record (timestamp "November 12, 2017") 0 7 IN,
      Record (timestamp "November 11, 2017") 1 3 TX,
      Record (timestamp "November 11, 2017") 1 5 NC,
      Record (timestamp "November 10, 2017") 0 4 OH,

      Record (timestamp "December 31, 2016") 2 2 GA,
      Record (timestamp "December 30, 2016") 2 2 CT,
      Record (timestamp "December 25, 2016") 0 4 AL,
      Record (timestamp "December 25, 2016") 3 4 IL,
      Record (timestamp "December 25, 2016") 1 5 NY 
    ]
