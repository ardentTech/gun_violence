module TextFormat exposing (capitalize)


capitalize : String -> String
capitalize str =
  String.toUpper(String.left 1 str) ++ String.dropLeft 1 str
