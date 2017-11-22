module Update exposing (update)

import D3
import Message exposing (Msg(..))
import Model exposing (Model)
import Filter exposing (Category(..), setCategory)


-- @todo if updating model.selectedYears only allow 2014-2017
update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
  case msg of
    SetCategory c ->
      let
        filter = setCategory Killed model.filter
      in
        ({ model | filter = filter }, D3.update model )
    _ -> ( model, Cmd.none )
