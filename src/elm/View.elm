module View exposing (view)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onInput)
import Svg exposing (svg)

import Model exposing (..)
import Message exposing (Msg(SelectCategory, SelectYear))
import TextFormat exposing (capitalize)


view : Model -> Html Msg
view model =
  div [ class "container-fluid" ] [
    div [ class "row" ] [
      div [ class "col-sm-3 col-md-3 bg-light", id "sidebar" ] [
        h4 [ id "app-title" ] [ text "US Gun Violence" ],
        Html.form [ id "filters" ] [ categories model, years model ],
        selectedState model
      ],
      div [ class "col-sm-9 col-md-9 ml-sm-auto", id "vis" ] [ svg [] []]
    ] 
  ]


-- PRIVATE


categories : Model -> Html Msg
categories model =
  toSelect model.categories model.selectedCategory "Category" SelectCategory (\c -> c)


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
  let
    toRow k v = tr [] <| List.map (\s -> td [] [ text s ]) [k, v]
  in
    case model.selectedState of
      Nothing -> text ""
      Just ss -> div [ id "state-details" ] [
        table [ class "table table-hover table-sm table-striped" ] [
          tbody [] [
            toRow "State" ss.name,
            toRow "Year" ( toString ss.year ),
            toRow ( "# " ++ capitalize ss.category ) ( toString ss.value )
--            toRow "Rank" "@todo"
          ]
        ]
      ]


years : Model -> Html Msg
years model =
  toSelect model.years model.selectedYear "Year" SelectYear (\i -> toString i)
