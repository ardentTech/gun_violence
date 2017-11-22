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
  div [ id "category" ] [
    select [ onInput SetCategory ] <| options model
  ]


-- PRIVATE


options : Model -> List ( Html Msg )
options model =
  let
    -- @todo refactor this
    toOption c = case c == model.filter.category of
      True -> option [ selected True, value (Category.toName c) ] [ text (Category.toName c) ]
      False -> option [ value (Category.toName c) ] [ text (Category.toName c) ] 
  in
    List.map toOption Category.all
