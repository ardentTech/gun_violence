module View exposing (view)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onInput)
import Svg exposing (svg)

import Model exposing (..)
import Message exposing (Msg(SelectCategory, SelectYear))


view : Model -> Html Msg
view model =
  div [ class "container-fluid" ] [
    div [ class "row" ] [
      div [ class "col-sm-3 col-md-3 bg-light", id "controls" ] [
        h4 [ id "app-title" ] [ text "US Gun Violence" ],
        Html.form [] [ categories model, years model ]
      ],
      div [ class "col-sm-9 col-md-9 ml-sm-auto", id "vis" ] [ svg [] []]
    ] 
  ]


-- PRIVATE


categories : Model -> Html Msg
categories model =
  toSelect model.categories model.selectedCategory "Categories" SelectCategory (\c -> c)


toSelect : List a -> Maybe a -> String -> (String -> Msg) -> (a -> String) -> Html Msg
toSelect items selectedItem label_ msg toStr =
    div [ class "form-group row" ] [
      label [ class "col-sm-4 col-form-label-sm" ] [ text label_ ],
      div [ class "col-sm-8" ] [
        select [ class "form-control form-control-sm", id <| String.toLower label_, onInput msg ] <|
        List.map (\i -> toOption i selectedItem toStr) items
      ]
    ]


toOption : a -> Maybe a -> (a -> String) -> Html Msg
toOption item selectedItem toStr =
  let
    isSelected = case selectedItem of
      Just i -> item == i
      _ -> False
  in
  option [ selected isSelected, value <| toStr item ] [ text <| toStr item ]


selectedState : Model -> Html Msg
selectedState model =
  case model.selectedState of
    Just s -> h3 [] [ text s ]
    _ -> text ""


years : Model -> Html Msg
years model =
  toSelect model.years model.selectedYear "Years" SelectYear (\i -> toString i)
