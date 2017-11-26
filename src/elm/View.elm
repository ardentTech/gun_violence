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
    h1 [] [ text "US Mass Shootings" ],
    div [ id "filters" ] [
      Category.options model.category,
      years model.years
    ]
  ]


-- PRIVATE


years : List Year -> Html Msg
years selectedYears =
    select [ onInput SetYear ] <| List.map (\y -> yearOption y <| List.member y selectedYears) allYears


yearOption : Year -> Bool -> Html Msg
yearOption year isSelected =
  option [ selected isSelected, value <| toString year ] [ text <| toString year ]
