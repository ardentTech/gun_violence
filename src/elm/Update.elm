module Update exposing (update)

import D3
import Message exposing (Msg(..))
import Model exposing (..)


-- @todo if updating model.selectedYears only allow 2014-2017
update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
  case msg of
    SetCategory c ->
      let
        filter = setCategory Killed model.filter
        records = []
      in
        ({ model | filter = filter, records = records }, D3.update records )
    _ -> ( model, Cmd.none )
