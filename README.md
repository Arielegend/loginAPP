# Loggin App

This is Loggin App!
In Order to login make sure

- Enter valid email
- Password must be at length of minimum 8, and contain 1 Upper case and 1 digit at least.

## Installation

- git clone https://github.com/Arielegend/loginAPP.git
- cd loginAPP
- npm i
- npm start

## Usage

Once Successfuly loggin, you will be redirected to '/info'

Here you can Filter data as you wish!

- Filter by name
  - NOT case sensitive
- Filter by Score / Duration / Bugs
  At the wanted field, may enter input as:
  - number -> Will display all rows, with curresponds field higher or equal to number
  - number1-number2 -> Will display all rows, with curresponds field in range of [number1 , number2]
    - In case you choose to filter by range, make sure to have no spaces
- Filter by DeadLine
  - Simply enter "False" or "True"
  - May also enter "F" or "T"
  - NOT case sensitive
