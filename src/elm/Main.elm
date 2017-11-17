module Main exposing (..)

import Html exposing (Html, div)


type alias Model = {}

init : ( Model, Cmd Msg )
init = ( {}, Cmd.none )


type Msg = NoOp


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
  case msg of
    _ -> ( model, Cmd.none )


view : Model -> Html Msg
view model = div [] []


main : Program Never Model Msg
main =
  Html.program {
    init = init,
    subscriptions = always Sub.none,
    update = update,
    view = view
  }
