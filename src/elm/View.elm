module View exposing (view)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onInput)

import Model exposing (..)
import Message exposing (Msg(SelectCategory, SelectYear))


view : Model -> Html Msg
view model =
  nav [ class "navbar navbar-expand-md navbar-dark fixed-top bg-dark" ] [
    span [ class "navbar-brand mr-auto" ] [ text "US Gun Violence" ],
    Html.form [ class "form-inline" ] [
      div [ class "form-group text-white", id "filters" ] [ categories model, years model ]
    ]
  ]


-- PRIVATE


toSelect : List a -> Maybe a -> String -> (String -> Msg) -> Html Msg
toSelect items selectedItem label_ msg =
    div [ class "form-group" ] [
      label [ class "col-form-label-sm" ] [ text label_ ],
      select [ class "form-control form-control-sm", onInput msg ] <|
        List.map (\i -> toOption i selectedItem) items
    ]


toOption : a -> Maybe a -> Html Msg
toOption item selectedItem =
  let
    isSelected = case selectedItem of
      Just i -> item == i
      _ -> False
  in
  option [ selected isSelected, value <| toString item ] [ text <| toString item ]


categories : Model -> Html Msg
categories model = toSelect model.categories model.selectedCategory "Categories" SelectCategory


years : Model -> Html Msg
years model = toSelect model.years model.selectedYear "Years" SelectYear
