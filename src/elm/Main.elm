port module Main exposing (main)

import Html exposing (Html, div)

import D3
import Message exposing (Msg)
import Model
import Update exposing (update)
import View exposing (view)


main : Program Never Model.Model Msg
main =
  let
    model = Model.init
  in
    Html.program {
      init = ( model, D3.update model ),
      subscriptions = always Sub.none,
      update = update,
      view = view
    }
