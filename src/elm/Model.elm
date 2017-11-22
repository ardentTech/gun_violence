module Model exposing (..)

import Record
import Filter


type alias Model = {
  filter : Filter.Filter
}


init : Model
init = { filter = Filter.init }
