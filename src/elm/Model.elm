module Model exposing (..)

import Record


type alias Model = {
  filter : Record.Filter,
  records : List Record.Record
}


initial : Model
initial = { filter = Record.initialFilter, records = Record.initial }
