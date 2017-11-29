port module Main exposing (main)

import Html exposing (Html, div)

import Message exposing (Msg)
import Model
import Subscriptions
import Update exposing (update)
import View exposing (view)


main : Program Never Model.Model Msg
main =
  Html.program {
    init = ( Model.init, Cmd.none ),
    subscriptions = Subscriptions.init,
    update = update,
    view = view
  }
