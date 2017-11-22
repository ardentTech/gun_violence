module Model exposing (..)

import Record
import Filter


type alias Model = {
  filter : Filter.Filter,
  records : List Record.Record
}


init : Model
init = { filter = Filter.init, records = Record.init }
