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
      div [ class "col-sm-3 col-md-3 bg-light", id "sidebar" ] [
        h4 [ id "app-title" ] [ text "US Mass Shootings" ],
        Html.form [ id "filters" ] [ categories model, years model ],
        dataAttribution
      ],
      div [ class "col-sm-9 col-md-9 ml-sm-auto", id "vis" ] [ svg [] []],
      div [ class "col-sm-9 col-md-9 ml-sm-auto", id "details" ] [
        details model
      ]
    ] 
  ]


-- PRIVATE


categories : Model -> Html Msg
categories model =
  toSelect model.categories model.selectedCategory "Category" SelectCategory (\c -> c)


dataAttribution : Html Msg
dataAttribution =
  div [ id "data-attribution" ] [
    span [] [ text "* Data from " ],
    a [ href "http://www.gunviolencearchive.org" ] [ text "Gun Violence Archive" ]]


details : Model -> Html Msg
details model =
  case model.selectedState of
    Just s -> div [] [
      h2 [] [ text <| (s.name ++ " in " ++ (toString s.year)) ],
      incidentTable s.incidents
    ]
    _ -> div [] []


incidentTable : List Incident -> Html Msg
incidentTable incidents =
  let
    headers = ["Address", "City or County", "Date", "# Killed", "# Injured"]
    headerCells = List.map (\t -> th [] [ text t ]) headers
    incidentRow i = tr [] <| List.map (\v -> td [] [ text v ]) [
      i.address, i.cityCounty, i.date, i.killed, i.injured ]
  in
    table [ class "table table-sm table-striped" ] [
      thead [] [ tr [] headerCells ],
      tbody [] <| List.map incidentRow incidents
    ]

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


years : Model -> Html Msg
years model =
  toSelect model.years model.selectedYear "Year" SelectYear (\i -> toString i)
