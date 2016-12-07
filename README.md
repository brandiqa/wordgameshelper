
# Word Games Helper

## Introduction
The Word Games Helper, written by Michael Wanyoike, is a simple script written in ES6 JavaScript. The script is used to help users play a Mobile game called 4 Pics 1 Word. It uses a couple of parameters to generate a list of words that can be a solution for a specific puzzle.

## Requirements
This script requires NodeJS version 4.6 or greater to be installed

## How it Works
The code requires two input parameters to be supplied in order to solve a specific puzzle
 - LENGTH : the number of characters that form the solution
 - CLUES : a list of characters that are used to form the solution. Some of the characters are not part of the solution.

The code has access to 2 dictionaries, the american-english and the cracklib-small, which is a subset and contains mostly the more commonly used English Words.

Generation of possible solutions is achieved through processing the dictionary using 3 different filters.

Filter 1 : The first filter eliminates words that due not match the character length of the LENGTH parameter.
Filter 2 : The second filter eliminates words that contain characters not present in the CLUES parameter.
Filter 3 : The third filter eliminates words that contain duplicate characters not accounted for in the CLUES parameter

Once the script finishes executing, a list of words that have passed all three filters are then printed out onto the screen for further analysis by the user.

## Run
Open terminal, navigate to the project folder and execute the command 'node fourpicsoneowrd.js'. You will have to change the parameters in the code to generate solutions for the puzzle you are trying to solve.

## Roadmap
The script can later be converted into an Android app, perhaps using a framework like Meteor. The script can also be adopted to help solving other Word Puzzles such as CodeWord.
