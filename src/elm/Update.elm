module Update exposing (update)

import Category
import D3
import Filter exposing (setCategory)
import Message exposing (Msg(..))
import Model exposing (Model)


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
  case msg of
    SetCategory category ->
      case Category.fromName category of
        Just c ->
          let
            newModel = { model | filter = setCategory c model.filter }
          in
            ( newModel, D3.update newModel )
        _ -> ( model, Cmd.none )
    _ -> ( model, Cmd.none )
