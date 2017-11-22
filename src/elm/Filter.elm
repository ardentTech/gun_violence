module Filter exposing (..)


type Category = Injured | Killed


type alias Filter = {
  category : Category,
  years : List Int  -- @todo limit this to 2014-2017
}


init : Filter
init = { category = Killed, years = [ 2017 ] }


setCategory : Category -> Filter -> Filter
setCategory c f = { f | category = c }
