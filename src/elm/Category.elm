module Category exposing (Category(..), fromName, init, options)

import Dict
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onInput)

import Message exposing (Msg(SetCategory))


type Category = Incidents | Injured | Killed | Victims


fromName : String -> Maybe Category
fromName key = Dict.get key hash


init : Category
init = Killed


options : Category -> Html Msg
options activeCategory =
  let
    options_ = List.map (\c -> toOption c <| c == activeCategory) all
  in
    div [ class "form-group" ] [
      label [ class "col-form-label-sm", for "categories" ] [ text "Category" ],
      select [ class "form-control form-control-sm", id "categories", onInput SetCategory ] <| options_
    ]


-- PRIVATE


all : List Category
all = [ Incidents, Injured, Killed, Victims ]


hash : Dict.Dict String Category
hash = Dict.fromList <| List.map (\c -> (toName c, c)) all


toName : Category -> String
toName category = toString category


toOption : Category -> Bool -> Html Msg
toOption category isSelected =
  let
    name = toName category
  in
    option [ selected isSelected, value name ] [ text name ]
