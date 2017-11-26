module View exposing (view)

import Html exposing (Html)

import Category
import Model exposing (Model)
import Message exposing (Msg)


-- @todo put category dropdown in Category module
view : Model -> Html Msg
view model = Category.options model.category
