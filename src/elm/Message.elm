module Message exposing (Msg(..))


type Msg =
  InitCategories (List String) |
  InitYears (List Int) |
  NoOp |
  SelectCategory String |
  SelectYear String
