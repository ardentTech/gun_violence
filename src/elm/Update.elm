module Update exposing (update)

import Json.Decode exposing (..)

import D3
import Message exposing (Msg(..))
import Model exposing (Model, SelectedState)


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
  case msg of
    InitCategories categories ->
      let
        newModel = { model | categories = categories }
      in
        ( newModel, D3.update newModel )
    InitYears years ->
      let
        newModel = { model | years = years }
      in
        ( newModel, D3.update newModel )
    SelectCategory category ->
      let
        newModel = { model | selectedCategory = Just category }
      in
        ( newModel, D3.update newModel )
    SelectState payload ->
      let
        res = case decodeString selectedStateDecoder payload of
          Ok v -> Just v
          _ -> Nothing
      in
        ({ model | selectedState = res }, Cmd.none )
    SelectYear year ->
      let
        year_ = Just <| Result.withDefault 0 (String.toInt year)
        newModel = { model | selectedYear = year_ }
      in
        ( newModel, D3.update newModel )
    _ -> ( model, Cmd.none )


-- PRIVATE


selectedStateDecoder : Decoder SelectedState
selectedStateDecoder = map4 SelectedState
  (field "category" string)
  (field "name" string)
  (field "value" int)
  (field "year" int)
