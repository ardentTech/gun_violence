module Update exposing (update)

import D3
import Message exposing (Msg(..))
import Model exposing (Model)


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
    SelectState name ->
      ({ model | selectedState = Just name }, Cmd.none )
    SelectYear year ->
      let
        year_ = Just <| Result.withDefault 0 (String.toInt year)
        newModel = { model | selectedYear = year_ }
      in
        ( newModel, D3.update newModel )
    _ -> ( model, Cmd.none )
