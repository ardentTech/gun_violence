module Update exposing (update)

import Message exposing (Msg)
import Model exposing (Model)


-- @todo if updating model.selectedYears only allow 2014-2017
update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
  case msg of
    _ -> ( model, Cmd.none )
