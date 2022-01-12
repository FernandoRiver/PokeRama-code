import {useCallback, useEffect, useState } from 'react';
import gsap from 'gsap';
import Card from './card/card-component';
import CountDown from './countDown/countDown';

function App() {
  const [pokemonData, setData] = useState(),
    [par, setPar] = useState(),
    [parId, setId] = useState(),
    [dif, setDif] = useState(4),
    [cont, setCont] = useState(0),
    [cardFind, setCardFind] = useState(0),
    [win, setWin] = useState(),
    [start, setStart] = useState(false),
    [timeFinish, setTimeFinish] = useState(),
    [cardFixed, setFixed] = useState(false),
    [timeReset, setReset] = useState(false),
    keyCard = [];

  // Obtener los pokemones con los id's
  const getData = async (dif) => {
    const idArray = await getId(dif)
    const dataArray = [];
    
    for(let i = 0; i < idArray.length; i++){
      const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${idArray[i]}`)
      .then(res => res.json())
      dataArray.push(data)
    }
    setData(dataArray)
  }
  
  // Agregar las tarjetas a comprobar 
  useEffect(async()=>{
    if(par){
      const len = par.length,
        card_1 = par[0],
        idCard_1 = parId[0],
        card_2 = par[1],
        idCard_2 = parId[1],
        same = idCard_1 === idCard_2;
  
      if(len > 2){
        let card_3 = par[2];
        setPar([card_3])
      }
      else if(len === 2){
        let class_1 = card_1.className.split(' ');
        let class_2 = card_2.className.split(' ');
        if(same){
          setTimeout(()=>{
            card_1.className=(class_1[0]+" "+class_1[1]+" animating find");
          },700)
          setTimeout(()=>{
            card_2.className=(class_2[0]+" "+class_2[1]+" animating find");
          },700)
          setId([]);
          setCardFind(cardFind+1);
        }
        else{
          if(!timeFinish){
            setTimeout(()=>{
              card_1.className=(class_1[0]+" "+class_1[1]+" ");
            },550)
            setTimeout(()=>{
              card_2.className=(class_2[0]+" "+class_2[1]+" ");
            },550)
          }
          setPar([]);
          setId([]);
        }
      }
    }
  },[cont,par]);

  // Comparar cuando se termine el tiempo o se descubran todos los pares
  useEffect(()=>{
    if(timeFinish){
      setWin(false);
    }
    if(cardFind === dif){
      setCardFind(0);
      setWin(true);
    }
  },[cardFind, timeFinish]);

  // Mostrar pantalla de resultado (ganaste o perdiste)
  useEffect(()=>{
    if(win){
    }
    else if(timeFinish){
      setFixed(true)
    }
  },[win]);
  // Obtener id's aleatorios
  const getId = async (dif) => {
    var myArray = [];
    let i = 0;
    while(i < dif) {
      const rnd = Math.floor((Math.random() * (300 - 1 + 1)) + 1);
      if(myArray.includes(rnd)){}
      else{
        myArray.push(rnd);
        myArray.push(rnd);
        i++;
      }
    }
    myArray = await reOrder(myArray)
    // console.log(myArray);
    return myArray;
  }

  // Reiniciar valores
  const reset = () => {
    setStart(false);
    setData();
    setPar();
    setWin();
    setTimeFinish(false);
    setCardFind(0);
    setReset(true);  
    setFixed(false); 
    setTimeout(() => {
      setReset(false);
    }, 500);
  }

  // Re-ordenar las cartas 
  const reOrder = (arr) => {
    let order = [];
    let array = [];
    let len = arr.length - 1;
    let i = 0;
    while(i < len+1) {
      const rnd = Math.floor((Math.random() * (len - 0 + 1)) + 0);
      if(order.includes(rnd)){}
      else{
        order.push(rnd);
        array.push(arr[rnd])
        i++;
      }
    }
    return array
  }

  // Pantalla de carga 
  useEffect(()=>{
    getData(dif)
    if(!pokemonData){
      gsap.to('.pokeball',{
        rotation:360,
        duration: 5,
        repeat: 10
      })
    }
  },[dif])

  
  
  return (
    <div className="table-game">
      <div className='control-area'>
        <div className='control'>
          <div className='button cargar' onClick={async()=>{
            reset();
            getData(dif);
            }}><p>Cargar</p></div>
          <div className='button facil' onClick={async()=>{
            if(dif !== 4){
              reset();
              setDif(4);
            }
            }}><p>Facil</p></div>
          <div className='button medio' onClick={async()=>{
            if(dif !== 6){
              reset();
              setDif(6);
            }
            }}><p>Normal</p></div>
          <div className='button dificil' onClick={async()=>{
            if(dif !== 10){
              reset();
              setDif(10);
            }
            }}><p>Dificil</p></div>
        </div>
        <div className='time'>
            <CountDown win={win} setTimeFinish={setTimeFinish} setReset={setReset} reset={timeReset} start={start} win={win} dif={dif}/>
        </div>
      </div>
      <div className='table-card'>
        { !pokemonData?<div className='loading'><div className='pokeball'></div></div>
          :pokemonData.map((e)=>{
            let key = e.id;
            let loop = keyCard.includes(key);
            // console.log(loop)
            if(loop){
              while(keyCard.includes(key)){
                key++;
                // console.log(key);
              }
              keyCard.push(key);
            }
            else{
              keyCard.push(key);
            }
            const rndShiny = Math.floor((Math.random() * (10 - 1 + 1)) + 1);
            return <Card key={key} id={e.id} data={e} set={setPar} par={par}
                          cont={cont} setCont={setCont} parId={parId} setId={setId}
                          fixed={cardFixed} reset={timeReset} setStart={setStart}
                  ></Card>
            
          }) 
        }
        {
          win?<div className='win-window'><p>¡Ganaste!</p></div>
          :(timeFinish?<div className='loose-window'><p>Perdiste!!!</p></div>:null)
        }
      </div>
    </div>
  );
}

export default App;