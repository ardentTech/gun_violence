module View exposing (view)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onInput)

import Category
import Model exposing (Model)
import Message exposing (Msg(SetCategory))


-- @todo put category dropdown in Category module
view : Model -> Html Msg
view model =
  let
    options = List.map (\k -> option [ value k ] [ text k ]) <| Category.keys
  in
    div [ id "category" ] [ select [ onInput SetCategory ] options ]
