module Message exposing (Msg(..))


type Msg =
  InitCategories (List String) |
  InitYears (List Int) |
  NoOp |
  SelectCategory String |
  SelectState String |
  SelectYear String
