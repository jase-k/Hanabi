# Hanabi Game Server
This app is used to create a new game deck, and modify the game deck based on an action. 

All calls will have `https://puddle-catcher.glitch.me` as a base.

Actions inlcude: 
- New Game
- Give Hint
- Discard Card
- Play Card
- Change Player's Turn

# Actions:

## New Game

Call `/newgame/:numberOfPlayers` *Query:* `name=TEXT`

Returns a game Object *Example Below* :

```
{
	numberOfPlayers: INTEGER,
	dateCreated: DATE,
	score: NULL, 
	originalDeck: [ARRAY OF CARDS {
		color: TEXT
		number: INTEGER
		hint: [ARRAY OF HINTS: TEXT, TEXT, ...]
		},
		{}...]
	playingDeck: [ARRAY OF CARDS (cards formatted the same as above^^) ],
	discardedCards: [EMPTY ARRAY],
	playedCards: [EMPTY ARRAY],
	hintsLeft: INTEGER,
	livesLeft: INTEGER, 
	players: [ARRAY OF PLAYERS {
		name:
		active: BOOLEAN
		hand: [ARRAY OF CARDS]
		},
		{}...]
}
```
## Join Game:

Call `/joingame/:gameid?name=TEXT`

This adds players to the game. Once all spots are filled the game goes 'live'. 

## End Game

Call `/endgame/:gameid`

This Call ends the Game and Creates a score for the game. Then returns the Game Object. 


## Update Game

Call `/game/:gameid/:name`

This will return the Game Object described above. This is intended to be called with a `setInterval()` function to update the game periodically throughout the game
and provide the `live` experience. 


## Play Card

Call `/game/:gameid/:name/playcard?cardIndex=INTEGER`

This will add the played card to the `playedCards` Array in the database and replace the card with the first card from the `playingDeck` Array. 
If the card does NOT play it will reduce the `livesLeft` by one.

It will then set `active` to `false` and make the next player's `active` `true`. 

## Discard Card

Call `/game/:gameid/:name/discard?cardIndex=INTEGER`

This will add the discarded card to the `discardedCards` array in the database, and replace the card with the first card from the `playingDeck` Array.
It will then set `active` to `false` and make the next player's `active` `true`. 

## Hint:

Call `/game/:gameid/:name/givehint?name=TEXT&hint=TEXT`

Hint Text has to be one of the following: `['orange', 'blue', 'black', 'white', 'red', 1, 2, 3, 4, 5]`

**request.params.name = The person Receiving the hint**

**request.query.name = The person Giving the Hint** 

This will update the hint count, and update public hints on the Receiving Players' cards.
It will then set `active` to `false` and make the next player's `active` `true`. 
 
