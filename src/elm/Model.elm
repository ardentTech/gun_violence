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


type alias SelectedState = {
  fips : String,
  incidents : List Incident,
  name : String }


type alias Incident = {
  address : String,
  cityCounty : String,
  date : String,
  injured : String,
  killed : String
}


init : Model
init = {
  selectedCategory = Nothing,
  selectedState = Nothing,
  selectedYear = Nothing,
  categories = [],
  years = [] }
