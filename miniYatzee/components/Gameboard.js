import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, Pressable } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import styles from '../style/Styles';
import { borderBottomColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

let board = [];
const NBR_OF_DICES = 5;
const NBR_OF_THROWS = 3;
let boardTwo = [];
const NBR_OF_CIRCLES = 6;
const BONUS_POINTS = 63;
const NBR_OF_TURNS = 6;
let boardThree = [];

export default function Gameboard() {
    
    const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
    const [status, setStatus] = useState('');
    const [selectedDices, setSelectedDices] = useState(new Array(NBR_OF_DICES).fill(false));
    const [selectedNumbers, setSelectedNumbers] = useState(new Array(NBR_OF_CIRCLES).fill(false));
    const [nbrOfTurnsLeft, setNbrOfTurnsLeft] = useState(NBR_OF_TURNS);
    const [sum, setSum] = useState(0);
    const [rowThree, setRowThree] = useState(new Array(NBR_OF_CIRCLES+1).fill(0));

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
                size={50}
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
                size={40}
                color={getCircleColor(i)}>
              </MaterialCommunityIcons>
            </Pressable>
            </View>
        );
    }

    //selecting of dices
    function selectDice(i) {
        let dices = [...selectedDices];
        dices[i] = selectedDices[i] ? false : true;
        console.log(row);
        console.log(valueOfDice(board[i]));
        console.log([valueOfDice(board[i])].reduce((a, b) => a + b));
        setSelectedDices(dices);
    }

    //value of dice
    function valueOfDice(cube) {
        return parseInt(cube.charAt(5));
    }

    //selecting of numbers
    function selectNumber(i) {
        let numbers = [...selectedNumbers];
        numbers[i] = selectedNumbers[i] ? false : true;
        console.log(i);
        setSelectedNumbers(numbers);
        //console.log([valueOfDice(board[i])].reduce((a, b) => a + b));
        let cir = [...rowThree];
        cir[i] = countPoints(i);
        setRowThree(cir);
   
        console.log(rowThree);
    }

    //throwing dices
    function throwDices() {
        for (let i = 0; i < NBR_OF_DICES; i++) {
            if (!selectedDices[i]) {
                let randomNumber = Math.floor(Math.random() * 6 + 1);
                board[i] = 'dice-' + randomNumber;
            }
        }

        //console.log(countPoints(2));
        setNbrOfThrowsLeft(nbrOfThrowsLeft-1);
    }

    function countPoints(number) {
        let counter = 0;
        for (let i = 0; i < NBR_OF_DICES; i++) {
            if (valueOfDice(board[i]) === number) {
                counter = counter + 1;
            }
        }
        return counter * number;
    }

    //checking bonus points
    function checkBonusPoints() {
        if (board.every((val, i, arr) => val === arr[0]) && nbrOfThrowsLeft > 0) {
            setStatus('You won');
        }
        else if (board.every((val, i, arr) => val === arr[0]) && nbrOfThrowsLeft === 0) {
            setStatus('You won, game over');
            setSelectedDices(new Array(NBR_OF_DICES).fill(false));
        }
        else if (nbrOfThrowsLeft === 0) {
            setStatus('Select your points.');
            setSelectedDices(new Array(NBR_OF_DICES).fill(false));
        }
        else if (nbrOfTurnsLeft === 0 && nbrOfThrowsLeft === 0) {
            setStatus('Game over. All points selected.');
            setSelectedDices(new Array(NBR_OF_DICES).fill(false));
        }
        else {
            setStatus('Select and throw dices again.');
        }
    }

    useEffect(() => {
        checkBonusPoints();
        if (nbrOfThrowsLeft === NBR_OF_TURNS) {
            setStatus('Game has not started. Throw dices.');
        }
        if (nbrOfThrowsLeft < 0) {
            setNbrOfThrowsLeft(NBR_OF_THROWS-1);
        }
    }, [nbrOfThrowsLeft]);


    return(
        <View style={styles.gameboard}>
            <View style={styles.flex}>{row}</View>
            <Text style={styles.gameinfo}>Throws left: {nbrOfThrowsLeft}</Text>
            <Text style={styles.gameinfo}>{status}</Text>
            <Pressable style={styles.button}
                onPress={() => throwDices()}>
                    <Text style={styles.buttonText}>
                        Throw dices
                    </Text>
            </Pressable>
            <Text style={styles.gameinfo}>Total: {sum}</Text>
            <Text style={styles.bonusinfo}>You are {BONUS_POINTS - sum} points away from bonus.</Text>
            
            <View style={styles.flex}>{rowTwo}</View>
        </View>
    )
}