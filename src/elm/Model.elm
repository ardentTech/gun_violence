module Model exposing (..)


type alias Category = String
type alias Year = Int


type alias Model = {
  selectedCategory : Maybe Category,
  selectedState : Maybe SelectedState,
  selectedYear : Maybe Year,
  categories : List Category,
  years : List Year 
}


type alias SelectedState = { name : String }


init : Model
init = {
  selectedCategory = Nothing,
  selectedState = Nothing,
  selectedYear = Nothing,
  categories = [],
  years = [] }
