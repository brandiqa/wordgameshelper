"use strict"

const fs = require('fs');

/*****************************************************************************/
/* INPUT PARAMETERS */
/*****************************************************************************/

let targetLength = process.argv[2];
let targetClues =  process.argv[3].split("");

if(!targetLength || !targetClues) {
	console.log('Input Parameters have not been provided (Length and Clues)')
	return;
}

/*****************************************************************************/
/* GLOBAL VARIABLES */
/*****************************************************************************/
const alphabet = 'a,b,c,d,e,f,g,h,i,j,k,l,m,o,n,p,q,r,s,t,u,v,w,x,y,z,\'';
const dictionaries = ['american-english','cracklib-small'];
let dictionary = dictionaries[0];

/*****************************************************************************/
/* BOOTSTRAP */
/*****************************************************************************/

// Load Dictionary
const dict = fs.readFileSync(dictionary).toString().split('\n');
console.log("DICTIONARY [" + dictionary + "] with [" + dict.length + "] WORDS");

//PRINT OUT VARIABLES
console.log("LENGTH PARAMETERS : [" + targetLength + "]\n");
console.log("CLUES PARAMETER : [" + targetClues + "]\n");

// Pre-process data for use by VARIABLES
let banCharacterList = buildBanCharacterList(); // Generate list of alphabet characters not in used in the CLUES parameter
let targetCluesMap = buildDuplicateCharMap(targetClues); // Convert CLUES parameter into a Map specifying duplicates as an integer value


/*****************************************************************************/
/* RUN */
/*****************************************************************************/

// Filter Out Words Matching Target Length
let wordLengthList = matchLength();

// Filter Out Words That Only Use Characters in the Target Clues
let wordCluesList = matchClues(wordLengthList);
//printArray(wordCluesList);

//Filter Out Words with Invalid Duplicate Characters
let wordDuplicateList = matchCharacterDuplicates(wordCluesList);
printArray(wordDuplicateList);

console.log("\n[" + wordLengthList.length + "] Words Passed the Length Parameter");
console.log("[" + wordCluesList.length + "] Words Passed the Clues Parameter");
console.log("[" + wordDuplicateList.length + "] Words Passed the Character Duplicate Test");


/*****************************************************************************/
/* UTILITIES */
/*****************************************************************************/

//Print Map keys and values to console
function printMap(map){
	for(const entry of map.entries()) {
		console.log(entry[0] + " : " + entry[1]);
	}
}

// Print array values to console
function printArray(array) {
	array.forEach(function(word){
		console.log(word);
	});
}

// Generate List of Characters Not Allowed In Filtered Out Words
function buildBanCharacterList() {
	let banList = new Array();
	alphabet.split(',').forEach(function(char){
		if(!isCharInClue(char)) {
			banList.push(char);
		}
	});
	return banList;
}

// Validate if the character provided is in the CLUES parameter
function isCharInClue(char) {
	let valid = false;
	targetClues.forEach(function(clueChar) {
		if(clueChar == char)
			valid = true;
	});
	return valid;
}

// Convert a character array into a Map specifying characters as keys and duplicates as values
// @charArray parameter - character
function buildDuplicateCharMap(charArray) {
	let duplicateCharMap = new Map();
	charArray.forEach(function (char) {
		if(duplicateCharMap.has(char)) {
			let val = duplicateCharMap.get(char) + 1;
			duplicateCharMap.delete(char);
			duplicateCharMap.set(char,val);
		}else {
			duplicateCharMap.set(char,1);
		}
	});
	return duplicateCharMap;
}

/*****************************************************************************/
/* FILTERS */
/*****************************************************************************/

// FILTER ONE : Collect words from the Dictionary that only match the LENGTH Parameter
function matchLength() {
	let array = new Array();
	dict.forEach(function(line) {
		if(line.trim().length == targetLength) {
			array.push(line.toLowerCase());
		}
	})
	return array;
}

// FILTER TWO : Collect words from Filter One that contain characters only included in the CLUES Parameter
function matchClues(wordList) {
	let array = new Array();
	wordList.forEach(function(word) {
		if(isWordValid(word)) {
			array.push(word);
		}
	});
	return array;
}

// Invalidate words that contain characters not provided in the CLUES parameter
function isWordValid(word) {
	let valid = true;
	banCharacterList.forEach(function(banchar) {
		if(word.indexOf(banchar) > -1){
			valid = false;
		}
	});
	return valid;
}

// FILTER THREE : Collect words from Filter 2 list that have not exceeded the duplicate characters specified in the CLUES parameter
function matchCharacterDuplicates(wordList) {
	let array = new Array();
	wordList.forEach(function (word) {
		if(hasValidDuplicates(word))
			array.push(word);
	});
	return array;
}

// Compare the number of duplicates in each character with the number of duplicates in the CLUES parameter
function hasValidDuplicates(word) {
	let valid = true;
	let wordMap = buildDuplicateCharMap(word.split(""));
	for(const entry of wordMap.entries()) {
		// Check if a certain character has not been used more than the allowed limit
		if(entry[1] > targetCluesMap.get(entry[0]))
			valid = false;
	}
	return valid;
}
