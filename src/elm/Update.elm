module Update exposing (update)

import Json.Decode exposing (..)

import D3
import Message exposing (Msg(..))
import Model exposing (..)


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
          Err e ->
            let
              msg = toString e
            in
              Debug.log msg
              Nothing
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
selectedStateDecoder = map3 SelectedState
  (field "fips" string)
  (field "incidents" (list incidentDecoder))
  (field "name" string)


incidentDecoder : Decoder Incident
incidentDecoder = map5 Incident
  (field "Address" string)
  (field "City Or County" string)
  (field "Incident Date" string)
  (field "# Injured" string)
  (field "# Killed" string)
