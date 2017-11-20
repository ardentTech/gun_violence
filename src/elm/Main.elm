port module Main exposing (main)

import Html exposing (Html, div)

import D3
import Message exposing (Msg)
import Model exposing (..)
import Update exposing (update)
import View exposing (view)


init : ( Model, Cmd Msg )
init = ({
    filter = initialFilter,
    -- @todo from CSV
    records = demoRecords
  }, D3.update demoRecords )


main : Program Never Model Msg
main =
  Html.program {
    init = init,
    subscriptions = always Sub.none,
    update = update,
    view = view
  }
