# Hanabi Game Server
This app is used to create a new game deck, and modify the game deck based on an action. 

All calls will have `https://puddle-catcher.glitch.me` as a base.

Actions inlcude: 
- New Game
- Join Game
- Give Hint
- Discard Card
- Play Card

# Actions:

## New Game

Call `/newgame/:numberOfPlayers?name=TEXT`

Returns a game Object *Example Below* :

```
{
	numberOfPlayers: INTEGER,
	dateCreated: DATE,
	score: NULL, 
	originalDeck: [ARRAY OF CARDS {
		color: TEXT
		hints: [ARRAY OF HINTS: TEXT, TEXT, ...]
		number: INTEGER
		},
		{}...]
	playingDeck: [ARRAY OF CARDS (cards formatted the same as above^^) ],
	discardedCards: [EMPTY ARRAY],
	playedCards: [EMPTY ARRAY],
	hintsLeft: INTEGER,
	livesLeft: INTEGER, 
	players: [ARRAY OF PLAYERS {
		active: BOOLEAN
		hand: [ARRAY OF CARDS]
		name:
		},
		{}...]
}
```
## Join Game:

Call `/joingame/:gameid?name=TEXT`

This adds players to the game. It adds req.query.name to the first null 'name' key in the game. If the name is already in the game it will return the game without adding another player.
If the game is full and the name is not found in the game, it will return a string 'Sorry, name not found in game.' 

## Update Game

Call `/game/:gameid/:name`

This will return the Game Object described above. This is intended to be called with a `setInterval()` function to update the game periodically throughout the game
and provide the `live` experience. If building a game with a websocket, you could use this call to broadcast a response to the players after another player makes a play. 


## Play Card

Call `/game/:gameid/:name/playcard?cardIndex=INTEGER`

This will add the played card to the `playedCards` Array in the database and replace the card with the first card from the `playingDeck` Array. 
If the card does NOT play it will reduce the `livesLeft` by one. It will put the played card in the discard pile if it does not play. 

It will add a string to the `gameObject.messages` array.

It will then set `active` to `0` and make the next player's `active` `1`. 

## Discard Card

Call `/game/:gameid/:name/discard?cardIndex=INTEGER`

This will add the discarded card to the `discardedCards` array in the database, and replace the card with the first card from the `playingDeck` Array.
It will increase `gameObject.hintsLeft` by 1. It will add a string to the `gameObject.messages` array explaining the action. 
It will then set `active` to `0` and make the next player's `active` `1`. 

## Give Hint:

Call `/game/:gameid/:name/givehint?name=TEXT&hint=TEXT`

Hint Text has to be one of the following: `['orange', 'blue', 'black', 'white', 'red', '1', '2', '3', '4', '5']`

**request.params.name = The person Giving the hint**

**request.query.name = The person Receiving the Hint** 

This will update the reduce the `gameObject.hintsLeft` by 1. It will update all the CARD OBJECT's `hints` array on the Receiving Player's hands.
It will then set `active` to `0` and make the next player's `active` `1`. 
 
