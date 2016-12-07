"use strict"

var fs = require('fs');

//INPUT PARAMETERS
var targetLength = 6;
var targetClues = "cclveowsakxi".split("");

//GLOBAL VARIABLES
var alphabet = 'a,b,c,d,e,f,g,h,i,j,k,l,m,o,n,p,q,r,s,t,u,v,w,x,y,z,\'';
var dictionaries = ['american-english','cracklib-small'];
var dictionary = dictionaries[1];
//Load Dictionary
var dict = fs.readFileSync(dictionary).toString().split('\n');
console.log("DICTIONARY [" + dictionary + "] with [" + dict.length + "] WORDS");

//PRINT OUT VARIABLES
console.log("LENGTH PARAMETERS : [" + targetLength + "]\n");
console.log("CLUES PARAMETER : [" + targetClues + "]\n");

// GENERATE
var banCharacterList = buildBanCharacterList();
var targetCluesMap = buildDuplicateCharMap(targetClues);


//EXECUTE
// Filter Out Words Matching Target Length
var wordLengthList = matchLength();

// Filter Out Words That Only Use Characters in the Target Clues
var wordCluesList = matchClues(wordLengthList);
// printArray(wordCluesList);

//Filter Out Words with Invalid Duplicate Characters
var wordDuplicateList = matchCharacterDuplicates(wordCluesList);
printArray(wordDuplicateList);

console.log("\n[" + wordLengthList.length + "] Words Passed the Length Parameter");
console.log("[" + wordCluesList.length + "] Words Passed the Clues Parameter");
console.log("[" + wordDuplicateList.length + "] Words Passed the Character Duplicate Test");


//FUNCTIONS
function matchCharacterDuplicates(wordList) {
	var array = new Array();
	wordList.forEach(function (word) {
		if(hasValidDuplicates(word))
			array.push(word);
	});
	return array;
}

function hasValidDuplicates(word) {
	var valid = true;
	var wordMap = buildDuplicateCharMap(word.split(""));
	for(const entry of wordMap.entries()) {
		// Check if a certain character has not been used more than the allowed limit
		if(entry[1] > targetCluesMap.get(entry[0]))
			valid = false;
	}
	return valid;
}

function printMap(map){
	for(const entry of map.entries()) {
		console.log(entry[0] + " : " + entry[1]);
	}
}

function printArray(array) {
	array.forEach(function(word){
		console.log(word);
	});
}

function matchLength() {
	var array = new Array();
	dict.forEach(function(line) {
		if(line.trim().length == targetLength) {
			array.push(line.toLowerCase());
		}
	})
	return array;
}

function matchClues(wordList) {	
	//Filter out words using Banned Characters
	var array = new Array();
	wordList.forEach(function(word) {
		if(isWordValid(word)) {
			array.push(word);
		}
	});
	return array;
}

//Checks if a word has character in the ban list
function isWordValid(word) {
	var valid = true;
	banCharacterList.forEach(function(banchar) {
		if(word.indexOf(banchar) > -1){
			valid = false;
		}
	});
	return valid;
}

// Generate List of Characters Not Allowed In Filtered Out Words
function buildBanCharacterList() {
	var banList = new Array();
	alphabet.split(',').forEach(function(char){
		if(!isCharInClue(char)) {
			banList.push(char);
		}
	});
	return banList;
}

function isCharInClue(char) {
	var valid = false;
	targetClues.forEach(function(clueChar) {
		if(clueChar == char)
			valid = true;
	});
	return valid;
}

function buildDuplicateCharMap(array) {
	var duplicateCharMap = new Map();
	array.forEach(function (char) {
		if(duplicateCharMap.has(char)) {
			var val = duplicateCharMap.get(char) + 1;
			duplicateCharMap.delete(char);
			duplicateCharMap.set(char,val);
		}else {
			duplicateCharMap.set(char,1);
		}
	});
	return duplicateCharMap;
}
