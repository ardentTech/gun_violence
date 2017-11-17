module Main exposing (..)

import Html exposing (Html, div)
import Date exposing (Date)


type VictimType = Injured | Killed


type alias Filter = {
  victimTypes : List VictimType,
  years : List Int  -- @todo limit this to 2014-2017
}


type State = CO | TX


type alias Record = {
  date : Date,
  injured : Int,
  killed : Int,
  state : State
}


type alias Model = {
  filter : Filter,
  records : List Record
}


init : ( Model, Cmd Msg )
init = ({
    filter = { victimTypes = [ Killed ], years = [ 2017 ] },
    records = []
  }, Cmd.none )


--


type Msg = NoOp


-- @todo if updating model.selectedYears only allow 2014-2017
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
