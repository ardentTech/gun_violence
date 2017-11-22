module Message exposing (Msg(..))


-- @todo instead of String use a Category Type
type Msg = NoOp | SetCategory String | ToggleYear Int
