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
  div [ id "category" ] [ select [ onInput SetCategory ] <| options model ]


-- PRIVATE


options : Model -> List ( Html Msg )
options model =
  List.map (\c -> toOption c <| c == model.filter.category) Category.all


toOption : Category.Category -> Bool -> Html Msg
toOption category isSelected =
  let
    name = Category.toName category
  in
    option [ selected isSelected, value name ] [ text name ]
