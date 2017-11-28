module View exposing (view)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onInput)

import Category
import Model exposing (..)
import Message exposing (Msg(SetYear))


-- @todo input labels
view : Model -> Html Msg
view model =
  nav [ class "navbar navbar-expand-md navbar-dark fixed-top bg-dark" ] [
    span [ class "navbar-brand mr-auto" ] [ text "US Gun Violence" ],
    Html.form [ class "form-inline" ] [
      div [ class "form-group text-white", id "filters" ] [
        Category.options model.category,
        years model.years
      ]
    ]

  ]


-- PRIVATE


years : List Year -> Html Msg
years selectedYears =
  div [ class "form-group" ] [
    label [ class "col-form-label-sm", for "years" ] [ text "Year" ],
    select [ class "form-control form-control-sm", id "years", onInput SetYear ] <| List.map (\y -> yearOption y <| List.member y selectedYears) allYears
  ]


yearOption : Year -> Bool -> Html Msg
yearOption year isSelected =
  option [ selected isSelected, value <| toString year ] [ text <| toString year ]
