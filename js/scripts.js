//scripts.js

$(function() {
	function randomString() {
		var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
		var str = '';
		for (var i = 0; i < 10; i++) {
			str += chars[Math.floor(Math.random() * chars.length)];
			console.log(str);
		}
		return str;

	}

	randomString();


	function Column(name) {
		var self = this; // useful for nested functions

		this.id = randomString();
		this.name = name;
		this.$element = createColumn();

		function createColumn() {
			// here is the code for creating the column
			var $column = $('<div>').addClass('column');
			var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
			var $columnCardList = $('<ul>').addClass('column-card-list');
			var $columnDelete = $('<button>').addClass('btn-delete').append('<i class="fa fa-trash-o" aria-hidden="true"></i>');
			var $columnAddCard = $('<button>').addClass('add-card').append('<i class="fa fa-plus-square" aria-hidden="true"></i>');
			
			// ADDING EVENTS
			$columnDelete.click(function() {
				self.removeColumn();
			});

			$columnAddCard.click(function() {
				var input = prompt("Enter the name of the card");
				if (input) {
					self.addCard(new Card(input));
				} else if (input === "") {
					alert('Please fill your card');
				}
			});

			// CONSTRUCTION COLUMN ELEMENT
			$column.append($columnTitle)
			.append($columnDelete)
			.append($columnAddCard)
			.append($columnCardList)

			// RETURN OF CREATED COLUMN
			return $column;
		}
	}

	Column.prototype = {
		addCard: function(card) {
			this.$element.children('ul').append(card.$element);
		},
		removeColumn: function() {
			this.$element.remove();
		}
	};

	function Card(description) {
		var self = this;

		this.id = randomString();
		this.description = description;
		this.$element = createCard();

		function createCard() {
			// CREATING BLOCKS
			var $card = $('<li>').addClass('card'); //dlaczefo $card a nie card = ?
			var $cardDescription = $('<p>').addClass('card-description').text(self.description);
			var $cardDelete = $('<button>').addClass('btn-delete').append('<i class="fa fa-minus-square" aria-hidden="true"></i>');
			var $cardEdit = $('<button>').addClass('edit').append('<i class="fa fa-pencil" aria-hidden="true"></i>');

			// BINDING TO CLICK EVENT
			$cardDelete.click(function(){
				self.removeCard();
			});

			$cardEdit.click(function () {
        		self.cardEdit($cardDescription);
      		});

			// COMBINING BLOCKS AND RETURNING THE CARD
			$card.append($cardDelete)
			.append($cardDescription)
			.append($cardEdit);
			return $card;
		}
	}

		Card.prototype = {
		removeCard: function() {
			this.$element.remove();
		},

		cardEdit: function(newDescription) {
	      var $newDescription = prompt('Edit your card', newDescription.text());
	      if ($newDescription !== null && $newDescription !== "") {
	        this.$element.children('p').text($newDescription);
	      }
	    }
	};

	var board = {
		name: 'Kanban Board',
		addColumn: function(column) {
			this.$element.append(column.$element);
			initSortable();
		},
		$element: $('#board .column-container')
	};

	function initSortable() {
		$('.column-card-list').sortable({
			connectWith: '.column-card-list',
			placeholder: 'card-placeholder',
			forcePlaceholderSize: true,
			dropOnEmpty: true,
			tolerance: 'intersect'
		}).disableSelection();
	}
	function columnSortable() {
		$('.column').sortable({
			connectWith: ".column"
		});
	}

	$('.create-column').click(function() {
		var name = prompt('Enter a column name');
		if (name) {
			var column = new Column(name);
			board.addColumn(column);
		}  else if (name === "") {
			alert('Please name your column');
		}
	});

	// CREATING COLUMNS
	var todoColumn = new Column('To do');
	var doingColumn = new Column('Doing');
	var doneColumn = new Column('Done');

	// ADDING COLUMNS TO THE BOARD
	board.addColumn(todoColumn);
	board.addColumn(doingColumn);
	board.addColumn(doneColumn);

	// CREATING CARDS
	var card1 = new Card('New task');
	var card2 = new Card('Create kanban boards');
	var card3 = new Card('Edit or delete');

	// ADDING CARDS TO COLUMNS
	todoColumn.addCard(card1);
	doingColumn.addCard(card2);
	doneColumn.addCard(card3);
});