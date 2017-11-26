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


-- @todo this should come from D3 since it parses the stats
allYears : List Year
allYears = [ 2017, 2016, 2015, 2014 ]
