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

export default function Gameboard() {
    
    const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
    const [status, setStatus] = useState('');
    const [selectedDices, setSelectedDices] = useState(new Array(NBR_OF_DICES).fill(false));
    const [selectedNumbers, setSelectedNumbers] = useState(new Array(NBR_OF_CIRCLES).fill(false));

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

    function getDiceColor(i) {
        return selectedDices[i] ? "#808000" : "#deb887";
    }
    
    function getCircleColor(i) {
        return selectedNumbers[i] ? "#808000" : "#deb887";
    } 

    const rowTwo = [];
    for (let i = 1; i <= NBR_OF_CIRCLES; i++) {
        boardTwo[i] = 'numeric-' + i + '-circle';
        rowTwo.push(
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
        );
    }

    function selectDice(i) {
        let dices = [...selectedDices];
        dices[i] = selectedDices[i] ? false : true;
        setSelectedDices(dices);
    }

    function selectNumber(i) {
        let numbers = [...selectedNumbers];
        numbers[i] = selectedNumbers[i] ? false : true;
        setSelectedNumbers(numbers);
    }

    function throwDices() {
        for (let i = 0; i < NBR_OF_DICES; i++) {
            if (!selectedDices[i]) {
                let randomNumber = Math.floor(Math.random() * 6 + 1);
                board[i] = 'dice-' + randomNumber;
            }
        }
        setNbrOfThrowsLeft(nbrOfThrowsLeft-1);
    }

    function checkWinner() {
        if (board.every((val, i, arr) => val === arr[0]) && nbrOfThrowsLeft > 0) {
            setStatus('You won');
        }
        else if (board.every((val, i, arr) => val === arr[0]) && nbrOfThrowsLeft === 0) {
            setStatus('You won, game over');
            setSelectedDices(new Array(NBR_OF_DICES).fill(false));
        }
        else if (nbrOfThrowsLeft === 0) {
            setStatus('Game over');
            setSelectedDices(new Array(NBR_OF_DICES).fill(false));
        }
        else {
            setStatus('Keep on throwing');
        }
    }

    useEffect(() => {
        checkWinner();
        if (nbrOfThrowsLeft === NBR_OF_THROWS) {
            setStatus('Game has not started');
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
            <View style={styles.flex}>{rowTwo}</View>
        </View>
    )
}