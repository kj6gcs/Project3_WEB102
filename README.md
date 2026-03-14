# Web Development Project 3 - _Advanced Flashcards for Introductory Astronomy Test Prep_

Submitted by: **Robby Wideman**

This web app: **Builds upon the previous, basic flashcard app for Introductory Astronomy test prep. It works as a flash card system/simulated quiz where users have the option to answer the question before seeing the answer.**

Time spent: **6.5** hours spent in total

## Required Features

The following **required** functionality is completed:

- [ X ] **The user can enter their guess into an input box _before_ seeing the flipside of the card**
  - Application features a clearly labeled input box with a submit button where users can type in a guess
  - Clicking on the submit button with an **incorrect** answer shows visual feedback that it is wrong
  - Clicking on the submit button with a **correct** answer shows visual feedback that it is correct
- [ X ] **The user can navigate through an ordered list of cardss**
  - A forward/next button displayed on the card navigates to the next card in a set sequence when clicked
  - A previous/back button displayed on the card returns to the previous card in the set sequence when clicked
  - Both the next and back buttons should have some visual indication that the user is at the beginning or end of the list (for example, graying out and no longer being available to click), not allowing for wrap-around navigation

The following **optional** features are implemented:

- [ X ] Users can use a shuffle button to randomize the order of the cards
  - Cards should remain in the same sequence (**NOT** randomized) unless the shuffle button is clicked
  - Cards should change to a random sequence once the shuffle button is clicked
- [ X ] A user’s answer may be counted as correct even when it is slightly different from the target answer
  - Answers are considered correct even if they only partially match the answer on the card
  - Examples: ignoring uppercase/lowercase discrepancies, ignoring punctuation discrepancies, matching only for a particular part of the answer rather than the whole answer
- [ X ] A counter displays the user’s current and longest streak of correct responses
  - The current counter increments when a user guesses an answer correctly
  - The current counter resets to 0 when a user guesses an answer incorrectly
  - A separate counter tracks the longest streak, updating if the value of the current streak counter exceeds the value of the longest streak counter
- [ ] A user can mark a card that they have mastered and have it removed from the pool of displayed cards
  - The user can mark a card to indicate that it has been mastered
  - Mastered cards are removed from the pool of displayed cards and added to a list of mastered cards

The following **additional** features are implemented:

- [ X ] Added big red reset button to allow users to reset deck if wanted
- [ X ] Created alert to pop up if user tries to flip card prior to making a guess
- [ X ] A user can enter a blank guess and be able to flip the card (for when a user may not know _anything_ about the answer)
- [ X ] Matches between a user answer and definition are highlighted on correct answers when card is flipped
- [ X ] Users can shuffle the deck if they would like
- [ X ] Input field for answers auto focuses at beginning of app and at each new card, making so users do not have to click into the input box each time
- [ X ] Users can press _Enter_ after typing their guess to submit, rather than needing to grab their mouse and click submit.

## Video Walkthrough

Here’s a video walkthrough of the implemented required features:

[![Watch the walkthrough](https://img.youtube.com/vi/zfRrX2UBtQk/hqdefault.jpg)](https://youtu.be/zfRrX2UBtQk)

<img src="advanced-flashcards/public/project3Walkthrough.gif" width="800" alt="GIF Walkthrough" />

GIF created with ScreenToGif (https://www.screentogif.com/) for Windows

## Notes

Describe any challenges encountered while building the app.

## License

    Copyright 2026 Robby Wideman

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
