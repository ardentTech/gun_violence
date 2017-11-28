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
  div [] [
    h3 [] [ text "US Mass Shootings" ],
    Html.form [ class "form-inline" ] [
      div [ class "form-group", id "filters" ] [
        Category.options model.category,
        years model.years
      ]
    ]
  ]


-- PRIVATE


years : List Year -> Html Msg
years selectedYears =
  div [ class "form-group mb-2 mr-sm-2 mb-sm-0" ] [
    label [ for "years" ] [ text "Year" ],
    select [ class "form-control", id "years", onInput SetYear ] <| List.map (\y -> yearOption y <| List.member y selectedYears) allYears
  ]


yearOption : Year -> Bool -> Html Msg
yearOption year isSelected =
  option [ selected isSelected, value <| toString year ] [ text <| toString year ]
