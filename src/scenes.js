//================SOME CONSTANTS AND PROPERTIES

var cardNum = 0;

var numOfCols = Math.floor((Game.width() - (LABEL_WIDTH+PADDING_H))/(CARD_WIDTH+PADDING_H));
var numOfRows = 0;

var cardFieldHeight = 0;
var memoryCardFieldHeight = 0;
var canvasCentre = Game.width()/2;

//the game chosen
var Cards;


//======displaying various elements

function displayCardsRandomly(cardClass){
	shuffledArray = createShuffledCardArray();   
    for(var curCardNum=1;curCardNum<=cardNum;++curCardNum){
      	    
   		var rowIndex = Math.ceil(curCardNum/numOfCols)-1;
   		var divResidue = (curCardNum % numOfCols);
   		if(divResidue ==0){
   			var colIndex = numOfCols - 1;	
   		}
   		else{
   			var colIndex = divResidue - 1;	
   		}
   		
   		var curCardName = 'spr_card'+(shuffledArray[curCardNum-1]);
   		var curCard = createCardByIndex(curCardName, colIndex, rowIndex);
        curCard.addComponent(cardClass); 
        if(cardClass=='CardAudio'){
        	attachLabelToCard(curCard,
        		Game.width() - LABEL_WIDTH, 
        		curCardNum*(PADDING_H+LABEL_HEIGHT));
 
        }
   }
}


function displayMemoryCardsRandomly(){
	shuffledArray = createMemoryArray();
	var numOfCards = shuffledArray.length;   
	var rowIndex= 0;
    for(var curCardNum=1;curCardNum<=numOfCards;++curCardNum){
      	    
   		rowIndex = Math.ceil(curCardNum/numOfCols)-1;
   		var divResidue = (curCardNum % numOfCols);
   		if(divResidue ==0){
   			var colIndex = numOfCols - 1;	
   		}
   		else{
   			var colIndex = divResidue - 1;	
   		}
   		var curCardName = 'spr_card'+(shuffledArray[curCardNum-1]);
   		var curCard = createCardByIndex(curCardName, colIndex, rowIndex);
        curCard.addComponent('CardMemory'); 
   }
   memoryCardFieldHeight = (rowIndex+1)*(CARD_HEIGHT+PADDING);
}

function displayBackToMainMenuButton(buttonY){
	displayButton('К выбору темы', 'MainMenu', BUTTON_PADDING_H, buttonY);  
}

function displayBackToMenuButton(buttonY){
	displayButton('В меню', 'Menu', BUTTON_WIDTH+BUTTON_PADDING_H, buttonY);  
}

function displayBackwardButton(sceneTitle, buttonY){ 
	displayButton('<<Назад', sceneTitle, 2*(BUTTON_WIDTH+BUTTON_PADDING_H), buttonY); 
}

function displayForwardButton(sceneTitle, buttonY){
	displayButton('Вперед>>', sceneTitle, 3*(BUTTON_WIDTH+BUTTON_PADDING_H), buttonY);  
}

function displayStartGameButton(sceneTitle, buttonY){
	displayButton('Начать', sceneTitle, 0.5*(Game.width()-BUTTON_WIDTH), buttonY);  
}


function displayButtonArray(titleArray){
	for(var i=0;i<titleArray.length;++i){
		displayButton(titleArray[i]['title'], titleArray[i]['scene'], 
									PADDING_H, BUTTON_PADDING+ (BUTTON_HEIGHT+BUTTON_PADDING)*i); 
	}
}

function displayButton(buttonLabel, sceneTitle, buttonX, buttonY){
	Crafty.e('Button').attr({x:buttonX, y:buttonY}).bind('Click', 
								function(e){
									Crafty.scene(sceneTitle);
								}
							).setText(buttonLabel);
}

function displayGameButtonArray(titleArray){
	var numOfGameButtonRows = Math.floor(Game.height() /(BUTTON_HEIGHT+BUTTON_PADDING));
	var colIndex = 0;
	
	for(var i=0;i<titleArray.length;++i){
		colIndex = Math.floor(i/numOfGameButtonRows);
   		var divResidue = i % numOfGameButtonRows;

   		if(divResidue ==0){
   			var rowIndex = 0;	
   		}
   		else{
   			var rowIndex = divResidue;	
   		}
   		

  		
		displayGameTypeButton(titleArray[i]['title'], titleArray[i]['cardsType'], 
									colIndex*(BUTTON_WIDTH+PADDING_H), 
									rowIndex* (BUTTON_HEIGHT+BUTTON_PADDING)); 
	}
}


function displayGameTypeButton(buttonLabel, cardsType, buttonX, buttonY){
	Crafty.e('Button').attr({x:buttonX, y:buttonY}).bind('Click', 
								function(e){
									Cards = cardsType;
									cardNum = 0;
							        for(obj in Cards){
							        	++cardNum;
							        }
							        numOfRows = Math.ceil(cardNum/numOfCols);
							        cardFieldHeight = numOfRows*(CARD_HEIGHT+LABEL_HEIGHT)+PADDING_V;
									Crafty.scene('ShowAssets');
								}).setText(buttonLabel);
}

function displayCustomText(text, textX, textY){
	Crafty.e('2D, DOM, Text')
        .text(text)
        .attr({ x: textX, y: textY, w:500})
        .textFont({family:'Cambria', size: '20px'});
}

//utils

function createShuffledCardArray(){
	var shuffledArray = Array();
	for(var i=0; i<cardNum; ++i){
		shuffledArray[i] = i+1;	
	}
	shuffledArray.sort(function(a, b){
			return 0.5-Math.random();
		});
	return shuffledArray;	
}

function createMemoryArray(){
	var shuffledArray = Array();
	var j=0;
	for(var i=0; i<cardNum; ++i){
		shuffledArray[j] = i+1;	
		++j;
		shuffledArray[j] = i+1;	
		++j;
	}
	shuffledArray.sort(function(a, b){
			return 0.5-Math.random();
		});
	return shuffledArray;	
}

function createCardByIndex(curCardName, colIndex, rowIndex){
	return Crafty.e(curCardName+', 2D, DOM, Mouse')
                .setName(curCardName)
                .attr({x: colIndex*(CARD_WIDTH + PADDING_H) + OFFSET, 
                	y: rowIndex*(CARD_HEIGHT + PADDING_V)
                	, w:CARD_WIDTH, h: CARD_HEIGHT});
}

function attachLabelToCard(curCard, labelX, labelY){
	var curLabel = Cards[curCard.getName()]['label'];
        Crafty.e('DraggableCardLabel')
                .CardLabel(curCard.x, curCard.y, curLabel, CARD_WIDTH, CARD_HEIGHT,
	             labelX, labelY)	
}

function initScene(){
	Crafty.audio.stop();
}


//==========SCENES

/*
 * The main menu
 */


Crafty.scene('MainMenu', function() {
	Crafty.audio.stop();
	
	
	var titleArray = [{'title': 'Животные-1', 
					    'cardsType': CardsAnimals1},
					  {'title': 'Животные-2', 
					    'cardsType': CardsAnimals2},
					   {'title': 'Грибы и ягоды', 
					    'cardsType': CardsPlants},
					   {'title': 'Еда', 
					    'cardsType': CardsFood},
					   {'title': 'Материальная культура-1', 
					    'cardsType': CardsMaterialCulture1},
					   {'title': 'Материальная культура-2', 
					    'cardsType': CardsMaterialCulture2},
					   {'title': 'Семья-1', 
					    'cardsType': CardsFamily1},
					   {'title': 'Семья-2', 
					    'cardsType': CardsFamily2},
					    /*{'title': 'Семья-2', 
					    'cardsType': CardsFamily2}      */
	
	
	];
	
	displayGameButtonArray(titleArray);

});


/**
 *The menu 
 */


Crafty.scene('Menu', function() {
	var titleArray = [{'title': 'Выучить слова', 
					    'scene': 'ShowCardsDescription'},
					  {'title': 'Уровень 1', 
					    'scene': 'AddLabelDescription'},
					   {'title': 'Уровень 2', 
					    'scene': 'ClickCardDescription'},
					   {'title': 'Memory', 
					    'scene': 'MemoryDescription'}  
	
	
	];
	Crafty.audio.stop();
    displayButtonArray(titleArray);
    
    displayBackToMainMenuButton(titleArray.length*(BUTTON_HEIGHT+BUTTON_PADDING)+BUTTON_PADDING);
});

/**
 * ShowCardsDescription
 */

Crafty.scene('ShowCardsDescription', function() {
	displayBackToMainMenuButton(2*PADDING_V);
	displayBackToMenuButton(2*PADDING_V);
	displayCustomText('Нажмите на изображение, чтобы услышать, как оно произносится', 
						Game.width()/2, PADDING_V);
	displayStartGameButton('ShowCards', 2*PADDING_V);
});


/**
 *shows the cards and adds their labels on click 
 */

Crafty.scene('ShowCards', function() {
    initScene();  
    
        
        
    displayCardsRandomly('CardAudioLabel');
    displayForwardButton('AddLabelDescription',cardFieldHeight);
    
    displayBackToMainMenuButton(cardFieldHeight);
    displayBackToMenuButton(cardFieldHeight);
    
    
});

/**
 * AddLabelDescription
 */

Crafty.scene('AddLabelDescription', function() {
	displayBackToMainMenuButton(2*PADDING_V);
	displayBackToMenuButton(2*PADDING_V);
	
	displayCustomText('Поднесите название к картинке', 
						Game.width()/2, PADDING_V);
	displayStartGameButton('AddLabel',2*PADDING_V);
});


/**
 *the player should match a label with a card 
 */


Crafty.scene('AddLabel', function() {    
    initScene();  
    
    //cards 
    
    displayCardsRandomly('CardAudio');
    //controls
    displayBackwardButton('ShowCards',cardFieldHeight);  
    displayForwardButton('ClickCard', cardFieldHeight); 
    
    displayBackToMainMenuButton(cardFieldHeight);
    displayBackToMenuButton(cardFieldHeight);
    //game logic
    this.labelsNotFound = cardNum;
    this.bind('LabelFound', function(){
    	--this.labelsNotFound;
    	if(this.labelsNotFound<=0){
    		this.unbind('LabelFound');
    	}	
    });	
    
});

/**
 * ClickCardDescription
 */

Crafty.scene('ClickCardDescription', function() {
	displayBackToMainMenuButton(2*PADDING_V);
	displayBackToMenuButton(2*PADDING_V);
	
	displayCustomText('Нажмите на картинку, название которой произносят', 
						Game.width()/2, PADDING_V);
	displayStartGameButton('ClickCard',2*PADDING_V);
});



/**
 *the player should match the word being pronounced with a card 
 */



Crafty.scene('ClickCard', function() {
	
	initScene();
	
    displayCardsRandomly('CardClickBySound');
	  
    
    displayBackwardButton('AddLabelDescription',cardFieldHeight);
    displayForwardButton('MemoryDescription', cardFieldHeight);
    
    displayBackToMainMenuButton(cardFieldHeight);
    displayBackToMenuButton(cardFieldHeight);
    
    //play the first word
    var i=0;
    this.curCardName = 'spr_card'+(i+1);
    Crafty.audio.play(this.curCardName+'_audio');
    
    this.bind('CardClicked', function(curCard){
    	var cardName = curCard._entityName; 
    	if(cardName==this.curCardName){
    		attachLabelToCard(curCard, curCard.x+((CARD_WIDTH-LABEL_WIDTH)/2), 
    												curCard.y+CARD_HEIGHT);
    		
    		++i;
    		if(i==cardNum){
    			this.unbind('CardClicked');
    		}
    		else{
    			this.curCardName = 'spr_card'+(i+1);
    			Crafty.audio.play(this.curCardName+'_audio');
    		}
    	}
    })
});


/**
 * ClickCardDescription
 */

Crafty.scene('MemoryDescription', function() {
	displayBackToMainMenuButton(2*PADDING_V);
	displayBackToMenuButton(2*PADDING_V);
	
	
	displayCustomText('Memory', 
						Game.width()/2, PADDING_V);
	displayStartGameButton('Memory',2*PADDING_V);
});


/**
 *the Memory game 
 */


Crafty.scene('Memory', function() {

	
	this.unbind('CardClicked');  
	
	initScene();
	
	
    displayMemoryCardsRandomly();
    displayBackwardButton('ClickCardDescription', memoryCardFieldHeight); 
    
    displayBackToMainMenuButton(memoryCardFieldHeight);
    displayBackToMenuButton(memoryCardFieldHeight);
    
    this.cardsLeft = cardNum;
    this.card1 = null;
    this.card2 = null;
    this.bind('CardClicked', function(curCard){
    	//two cards are already shown
    	//close them
    	if(this.card2){
    		this.card1.hide();
			this.card2.hide();
			
			this.card1 = null;
			this.card2 = null;
    	}
    	Crafty.audio.stop();
    	Crafty.audio.play(curCard._entityName+'_audio');
    	//no cards shown
    	if(!this.card1){
    		this.card1  = curCard;
    		this.card1.reveal();
    	}
    	//one card is shown and its name is the same as the new card's name
    	else if(this.card1._entityName == curCard._entityName){
	    	if(this.card1!=curCard){
	    		//it's not the same card
		    	this.card1.showForever();
		    	curCard.showForever();
		    	this.card1 = null;
		    	--this.cardsLeft;
		    	if(this.cardsLeft<=0){
		    		alert('you win!');
    				this.unbind('CardClicked');
		    	}
	    	}
		}
		//one card is shown, but it's different
		else{
			this.card2 = curCard;
			this.card1.reveal();
			this.card2.reveal();
			this.card1.hideAfterTimeout(this.card2, TIMEOUT_LAPSE);
		}
    })
});


Crafty.scene('ShowAssets', function(){
	var audioArr={};
	for (var key in Cards){
		var curCard={};
		curCard[key]=[0, 0, 4, 4];
		Crafty.sprite('assets/'+Cards[key]['pict'], curCard, 0, 2);
		var curCardAudio=Array();
		for(var i=0;i<Cards[key]['audio'].length;++i){
			curCardAudio[i]='assets/'+Cards[key]['audio'][i];
		}
		audioArr[key+'_audio']=curCardAudio;
    }

    Crafty.audio.add(audioArr);
    Crafty.scene('Menu');
 }
);


Crafty.scene('Loading', function(){
    	Crafty.e('2D, DOM, Text')
        .text('Loading; please wait...')
        .attr({ x: 0, y: Game.height()/2 - 24, w: Game.width() })
        .css($text_css);
        
        //TODO: load evert level type!


            var toLoadArr=Array();
            var i =0;
            var curDict = CardsAnimals1;
            for (var key in curDict){
                toLoadArr[i]='assets/'+curDict[key]['pict'];                
                
                ++i;
                
                for(var j=0;j<curDict[key]['audio'].length;++j){
                	toLoadArr[i]='assets/'+curDict[key]['audio'][j];
                	++i;
                }

            }
            
            var curDict = CardsAnimals2;
            for (var key in curDict){
                toLoadArr[i]='assets/'+curDict[key]['pict'];                
                
                ++i;
                
                for(var j=0;j<curDict[key]['audio'].length;++j){
                	toLoadArr[i]='assets/'+curDict[key]['audio'][j];
                	++i;
                }

            }
            
            var curDict = CardsPlants;
            for (var key in curDict){
                toLoadArr[i]='assets/'+curDict[key]['pict'];                
                
                ++i;
                
                for(var j=0;j<curDict[key]['audio'].length;++j){
                	toLoadArr[i]='assets/'+curDict[key]['audio'][j];
                	++i;
                }

            }
            
            var curDict = CardsFood;
            for (var key in curDict){
                toLoadArr[i]='assets/'+curDict[key]['pict'];                
                
                ++i;
                
                for(var j=0;j<curDict[key]['audio'].length;++j){
                	toLoadArr[i]='assets/'+curDict[key]['audio'][j];
                	++i;
                }

            }
            
            var curDict = CardsMaterialCulture1;
            for (var key in curDict){
                toLoadArr[i]='assets/'+curDict[key]['pict'];                
                
                ++i;
                
                for(var j=0;j<curDict[key]['audio'].length;++j){
                	toLoadArr[i]='assets/'+curDict[key]['audio'][j];
                	++i;
                }

            }
            
            var curDict = CardsMaterialCulture2;
            for (var key in curDict){
                toLoadArr[i]='assets/'+curDict[key]['pict'];                
                
                ++i;
                
                for(var j=0;j<curDict[key]['audio'].length;++j){
                	toLoadArr[i]='assets/'+curDict[key]['audio'][j];
                	++i;
                }

            }
            
            var curDict = CardsFamily1;
            for (var key in curDict){
                toLoadArr[i]='assets/'+curDict[key]['pict'];                
                
                ++i;
                
                for(var j=0;j<curDict[key]['audio'].length;++j){
                	toLoadArr[i]='assets/'+curDict[key]['audio'][j];
                	++i;
                }

            }
            
            Crafty.load(toLoadArr, function(){
            	Crafty.scene('MainMenu');
    		}
    )
}
);





