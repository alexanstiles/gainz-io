import React from "react";
import "./App.css";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select"
import FormControl from "@material-ui/core/FormControl"
import InputLabel from "@material-ui/core/InputLabel"
import Button from "@material-ui/core/Button"

function App() {

  function markovMe() {
    const markovChain = {};
    const textArr = document.getElementById("inputBox").value.split(" ");
    for (let i = 0; i < textArr.length; i++) {
      let word = textArr[i].toLowerCase().replace(/[\W_]/, "");
      if (!markovChain[word]) {
        markovChain[word] = [];
      }
      if (textArr[i + 1]) {
        markovChain[word].push(
          textArr[i + 1].toLowerCase().replace(/[\W_]/, "")
        );
      }
    }
    const words = Object.keys(markovChain);
    let word = words[Math.floor(Math.random() * words.length)];
    let result = "";
    for (let i = 0; i < words.length; i++) {
      result += word + " ";
      var newWord =
        markovChain[word][Math.floor(Math.random() * markovChain[word].length)];
      word = newWord;
      if (!word || !markovChain.hasOwnProperty(word))
        word = words[Math.floor(Math.random() * words.length)];
    }
    document.getElementById("markovResults").innerText = result;
  }

  return (
    <div className="App">
      <AppBar position="static" style={{ height: 75, marginBottom: 75 }}>
      </AppBar>
      <Typography variant="h2" align="center" style={{marginBottom: 50}}>Build a customized workout!</Typography>
      <FormControl style={{marginBottom: 50}}>
        <InputLabel htmlFor="age-native-simple">Muscle Group</InputLabel>
        <Select
          native
          style={{width: 300}}
        >
          <option aria-label="None" value="" />
          <option value={10}>Upper Body</option>
          <option value={20}>Lower Body</option>
          <option value={30}>Core</option>
        </Select>
      </FormControl>
      <FormControl style={{marginBottom: 50, marginLeft: 20}}>
        <InputLabel htmlFor="age-native-simple">Difficulty Level</InputLabel>
        <Select
          native
          style={{width: 300}}
        >
          <option aria-label="None" value="" />
          <option value={10}>Low</option>
          <option value={20}>Medium</option>
          <option value={30}>High</option>
        </Select>
      </FormControl>
      <div display="inline-block">
        <div style={{position: 'relative', display: 'flex', flexDirection:'column', justifyContent: 'center'}}>
          <Typography style={{marginBottom: 50}}>
            Input your workout below (Markov Chain Text Generation Example)
          </Typography>
          <input id="inputBox" style={{height: 200, width: 500, margin: 'auto', marginBottom: 50}}></input>
          <Button stye={{width: 100}} onClick={() => markovMe()}>Click me to generate your workout!</Button>
        </div>
        <div>
          <p id="markovResults" />
        </div>
      </div>
    </div>
  );
}

export default App;
