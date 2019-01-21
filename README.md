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
	players: [ARRAY OF PLAYERS {
		name:
		hand: [ARRAY OF CARDS]
		},
		{}...]
}
```


