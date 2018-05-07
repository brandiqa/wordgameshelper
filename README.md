# Four Pics One Word Clue Generator

## Introduction

This is a clues generator built for solving [Four Pics One Word](https://play.google.com/store/apps/details?id=de.lotum.whatsinthefoto.us&hl=en) game. It simply lists down the possible words based on the letters supplied and the number of slots provided for the answer.

![puzzle](http://i141.photobucket.com/albums/r78/dizzykatty/6f1640a35034afdffe32f9f95694804a.jpg)

## Requirements

This script requires an [NodeJS](https://nodejs.org/en/) environment.

## How to Run

The syntax for running the program in the terminal is:

```bash
node fourpicsoneword.js <slots count> <character clues>
```

As an example, let's solve the above puzzle by generating a list of clues. Execute the following command in the terminal:

```bash
node fourpicsoneword.js 7 onizatecdnow
```

You should get the following output:

```bash
DICTIONARY [american-english] with [99172] WORDS
LENGTH PARAMETERS : [7]

CLUES PARAMETER : [o,n,i,z,a,t,e,c,d,n,o,w]

antoine
antonio
aconite
ancient
condone
connote
contain
contend
intoned
noticed
twinned

[14788] Words Passed the Length Parameter
[86] Words Passed the Clues Parameter
[11] Words Passed the Character Duplicate Test
```

If you look at the list of clues generated, the most obvious answer is **ancient**!

## How it Works

The code requires two input parameters to be supplied in order to solve a specific puzzle

- LENGTH : the number of characters that form the solution
- CLUES : a list of characters that are used to form the solution. Some of the characters are not part of the solution.

The code has access to 2 dictionaries, the american-english and the cracklib-small, which is a subset and contains mostly the more commonly used English Words. Generation of possible solutions is achieved through processing the dictionary using 3 different filters.

- Filter 1 : The first filter eliminates words that due not match the character length of the LENGTH parameter.
- Filter 2 : The second filter eliminates words that contain characters not present in the CLUES parameter.
- Filter 3 : The third filter eliminates words that contain duplicate characters not accounted for in the CLUES parameter

Once the script finishes executing, a list of words that have passed all three filters are then printed out onto the screen for further analysis by the user.

## Road map

The script may later be converted to a Progressive Web App
