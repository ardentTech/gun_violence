module View exposing (view)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onInput)

import Model exposing (Model)
import Message exposing (Msg(SetCategory))


view : Model -> Html Msg
view model =
  div [ id "category" ] [
    select [ onInput SetCategory ] [
      option [ value "0" ] [ text "Killed" ],
      option [ value "1" ] [ text "Injured" ]
    ]
  ]
