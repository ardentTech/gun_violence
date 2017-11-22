module Category exposing (Category(..), all, fromName, toName)

import Dict


type Category = Injured | Killed


all : List Category
all = [ Injured, Killed ]


fromName : String -> Maybe Category
fromName key = Dict.get key hash


toName : Category -> String
toName category = toString category


-- PRIVATE


hash : Dict.Dict String Category
hash = Dict.fromList <| List.map (\c -> (toName c, c)) all
