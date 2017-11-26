module Update exposing (update)

import Category
import D3
import Message exposing (Msg(..))
import Model exposing (Model)


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
  case msg of
    SetCategory category ->
      -- @todo this translation should happen in the view
      case Category.fromName category of
        Just c ->
          let
            newModel = { model | category = c }
          in
            ( newModel, D3.update newModel )
        _ -> ( model, Cmd.none )
    ToggleYear year -> ( model, Cmd.none )
    _ -> ( model, Cmd.none )
