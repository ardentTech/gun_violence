module Model exposing (..)

import Category exposing (Category)


type alias Year = Int


type alias Model = {
  category : Category,
  years : List Year 
}


init : Model
init = {
  category = Category.init,
  years = [ 2017 ] }


allYears : List Year
allYears = [ 2017, 2016 ]
