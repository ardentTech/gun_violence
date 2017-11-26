module Model exposing (..)

import Category exposing (Category)


type alias Model = {
  category : Category,
  years : List Int
}


init : Model
init = {
  category = Category.init,
  years = [ 2017, 2016 ]}
