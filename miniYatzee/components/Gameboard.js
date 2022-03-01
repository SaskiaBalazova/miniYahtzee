import React, { useState, useEffect } from 'react';
import { Text, View, Pressable, NativeModules} from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import styles from '../style/Styles';

let board = [];
const NBR_OF_DICES = 5;
const NBR_OF_THROWS = 3;
let boardTwo = [];
const NBR_OF_CIRCLES = 6;
const BONUS_POINTS = 63;
const NBR_OF_TURNS = 6;


export default function Gameboard() {
    
    const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
    const [status, setStatus] = useState('');
    const [selectedDices, setSelectedDices] = useState(new Array(NBR_OF_DICES).fill(false));
    const [selectedNumbers, setSelectedNumbers] = useState(new Array(NBR_OF_CIRCLES).fill(false));
    const [nbrOfTurnsLeft, setNbrOfTurnsLeft] = useState(NBR_OF_TURNS);
    const [sum, setSum] = useState(0);
    const [rowThree, setRowThree] = useState(new Array(NBR_OF_CIRCLES+1).fill(0));
    const [locked, setLocked] = useState(new Array(NBR_OF_CIRCLES).fill(false));
    const [endOfRound, setEndOfRound] = useState(false);
    const [selected, setSelected] = useState(false);
    const [endOfGame, setEndOfGame] = useState(false);
    const [bonus, setBonus] = useState('');

    //dices
    const row = [];
    for (let i = 0; i < NBR_OF_DICES; i++) {
        row.push(
            <Pressable
                key={"row" + i}
                onPress={() => selectDice(i)}>
              <MaterialCommunityIcons
                name={board[i]}
                key={"row" + i}
                size={75}
                color={getDiceColor(i)}>
              </MaterialCommunityIcons>
            </Pressable>
        );
    }

    //color of dices
    function getDiceColor(i) {
        return selectedDices[i] ? "#808000" : "#deb887";
    }
    
    //color of circles with numbers
    function getCircleColor(i) {
        return selectedNumbers[i] ? "#808000" : "#deb887";
    } 

    //circles with numbers
    const rowTwo = [];
    for (let i = 1; i <= NBR_OF_CIRCLES; i++) {
        boardTwo[i] = 'numeric-' + i + '-circle';
        rowTwo.push(
            <View key={"rowTwo" + i}>
            <Text style={styles.points}>{rowThree[i]}</Text>
            <Pressable
                key={"rowTwo" + i}
                onPress={() => selectNumber(i)}>
              <MaterialCommunityIcons
                name={boardTwo[i]}
                key={"rowTwo" + i}
                size={60}
                color={getCircleColor(i)}>
              </MaterialCommunityIcons>
            </Pressable>
            </View>
        );
    }

    //selecting of dices
    function selectDice(i) {
        if(nbrOfThrowsLeft){
            let dices = [...selectedDices];
            dices[i] = selectedDices[i] ? false : true;
            setSelectedDices(dices);
        }
        else {
            setStatus("You have to throw dices first");
        }
    }

    //value of dice
    function valueOfDice(cube) {
        return parseInt(cube.charAt(5));
    }

    function roundCheck(i){
        let counter = 0;
        let loctemp = locked;
        for(let i = 1; i <= 6; i++){
          if(!loctemp[i]){counter = counter + 1}
        }
        if(counter === nbrOfTurnsLeft){
            loctemp[i] = true;
            setLocked(loctemp);
            setEndOfRound(false);
            return true;
        }
        else {
            return false
        }
      }

    function hasDiceNum(i){
        for(let j = 0; j < NBR_OF_DICES; j++){
            if(i === valueOfDice(board[j])){return true;}
            
        }
        return false;
    }

    //selecting of numbers
    function selectNumber(i) {
        if (!board.length) {
            setStatus("Throw 3 times before setting points");
            return;
        }
        if(hasDiceNum(i)){
            if(nbrOfThrowsLeft === 0 && !locked[i] && roundCheck(i)){
                let numbers = [...selectedNumbers];
                setSelected(true);
                setSelectedDices(new Array(NBR_OF_DICES).fill(false));
                setStatus("Throw dices.");
                if (nbrOfThrowsLeft === 0 && nbrOfTurnsLeft === 1) {
                    setStatus('Game over. All points selected.');
                } 
                numbers[i] = selectedNumbers[i] ? false : true;
                setSelectedNumbers(numbers);
                let cir = [...rowThree];
                cir[i] = countPoints(i);
                setRowThree(cir);
                setSum(cir.reduce((a, b) => a + b));
            }
            else if(nbrOfThrowsLeft === 0 && locked[i] && roundCheck(i)) {
                setStatus("You already selected points for " + (i));
            }
            else {
                setStatus("Throw 3 times before setting points");
            }
        }
    }

    //throwing dices
    function throwDices() {
        if (nbrOfThrowsLeft === 0 && nbrOfTurnsLeft === 1) {
            NativeModules.DevSettings.reload();
        }
        if(!nbrOfThrowsLeft)setNbrOfTurnsLeft(nbrOfTurnsLeft-1);
        for (let i = 0; i < NBR_OF_DICES; i++) {
            if (!selectedDices[i]) {
                let randomNumber = Math.floor(Math.random() * 6 + 1);
                board[i] = 'dice-' + randomNumber;
            }
        }
        setNbrOfThrowsLeft(nbrOfThrowsLeft-1);
    }

    //choosing of numbers
    const possibleChoice = () => {
        for (let i = 0; i < NBR_OF_DICES; i++) {
            for (let j = 1; j <= NBR_OF_CIRCLES; j++) {
                if (j === valueOfDice(board[i]) && !locked[j] ) {
                    return false;
                }
            }
        }
        setEndOfGame(true);
        setStatus("Game over.");
        return true;
    }

    //counting of points
    function countPoints(number) {
        let counter = 0;
        for (let i = 0; i < NBR_OF_DICES; i++) {
            if (valueOfDice(board[i]) === number) {
                counter = counter + 1;
            }
        }
        return counter * number;
    }

    const restart = () => {
        setStatus('Select your points before next throw.');
        if (endOfGame) {
            NativeModules.DevSettings.reload();
        }
    }

    //checking status of game
    function checkGameStatus() {
        if (nbrOfThrowsLeft === 0) {
            setStatus('Select your points.');
            setSelectedDices(new Array(NBR_OF_DICES).fill(false));
        }
        else {
            setStatus('Select and throw dices again.');
        }
    }

    //checking bonus points
    function checkBonusPoints() {
        if (sum >= BONUS_POINTS) {
            setBonus('You got the bonus!');
        }
        else {
            setBonus('You are ' + (BONUS_POINTS - sum) + ' points away from bonus.');   
        }
    }

    useEffect(() => {
        checkGameStatus();
        if (nbrOfThrowsLeft === NBR_OF_THROWS) {
            setStatus('Game has not started. Throw dices.');
        } 
        if (nbrOfThrowsLeft < 0) {
            setNbrOfThrowsLeft(NBR_OF_THROWS-1);
            setSelected(false);
        }
        if (nbrOfThrowsLeft === 0) {
            setEndOfRound(true);
            possibleChoice();
        }
        if (nbrOfThrowsLeft === 0 && nbrOfTurnsLeft === 0) {
            setStatus('Game over.');
        } 
    }, [nbrOfThrowsLeft]);

    useEffect(() => {
        checkBonusPoints();
    }, [selected]);


    return(
        <View style={styles.gameboard}>
            <View style={styles.flex}>{row}</View>
            <Text style={styles.gameinfo}>Throws left: {selected?"3":nbrOfThrowsLeft}</Text>
            <Text style={styles.gameinfo}>{status}</Text>
            <Pressable style={styles.button}
                onPress={() => !endOfRound?throwDices():restart()}>
                    <Text style={styles.buttonText}>
                        {(endOfGame)?"New game":(selected && nbrOfTurnsLeft === 1)?"New game":"Throw dices"}
                    </Text>
            </Pressable>
            <Text style={styles.gameinfo}>Total: {sum}</Text>
            <Text style={styles.bonusinfo}>{bonus}</Text>
            <View style={styles.flex}>{rowTwo}</View>
        </View>
    )
}
