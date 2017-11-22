module Category exposing (..)

import Dict


type Category = Injured | Killed


all : List Category
all = [ Injured, Killed ]


hash : Dict.Dict String Category
hash = Dict.fromList <| List.map (\c -> (toString c, c)) all


keys : List String
keys = Dict.keys hash


lookup : String -> Maybe Category
lookup key = Dict.get key hash
