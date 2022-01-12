import React, { useEffect, useState } from "react";

const CountDown = (props) => {
    const [time, setTime] = useState({ms:0, s:40, m:0, h:0}),
        [interv, setInterv] = useState(),
        [timeShow, setTimeShow] = useState("00:00:00"),
        [status, setStatus] = useState(false),
        dif = props.dif,
        start  = props.start,
        reset = props.reset,
        setTimeFinish = props.setTimeFinish,
        win = props.win;

    var updatedMs = time.ms, updatedS = time.s, updatedM = time.m, updatedH = time.h;
    
    useEffect(()=>{
        if(win){
            clearInterval(interv);
        }
        if(reset){
            setTime({ms:0, s:0, m:0, h:0});
            setTimeShow("00:00:00");
            clearInterval(interv);
            setStatus(false);
            switch(dif){
                case 4:{
                    setTime({ms:0, s:30, m:0, h:0});
                    setTimeShow("00:00:30");
                    break;
                }
                case 6:{
                    setTime({ms:0, s:20, m:1, h:0});
                    setTimeShow("00:01:20");
                    break;
                }
                case 10:{
                    setTime({ms:0, s:1, m:1, h:0});
                    setTimeShow("00:01:00");
                    break;
                }
            }
        }
        if(start){
            switch(dif){
                case 4:{
                    setTime({ms:0, s:30, m:0, h:0});
                    setTimeShow("00:00:30");
                    break;
                }
                case 6:{
                    setTime({ms:0, s:20, m:1, h:0});
                    setTimeShow("00:01:20");
                    break;
                }
                case 10:{
                    setTime({ms:0, s:1, m:1, h:0});
                    setTimeShow("00:01:00");
                    break;
                }
            }
            setStatus(true);
        }
    },[reset,start,win]);

    const converter = (h,m,s)=>{
        let hour = h;
        let minute = m;
        let second = s;
        if(hour < 10){
            hour = ("0"+(hour).toString());
        }
        if(minute < 10){
            minute = "0"+(minute).toString();
        }
        if(second < 10){
            second = "0"+(second).toString();
        }
        let aux = hour+":"+minute+":"+second;
        return aux
    }
    const run = () => {
        if(updatedMs === 0 && (updatedS>0)){
            updatedS--;
            updatedMs=99;
        }
        if(updatedS === 0 && (updatedM>0)){
            updatedM--;
            updatedS=59;
        }
        if(updatedM === 0 && (updatedH>0)){
            updatedH--;
            updatedM=59;
        }
        if(updatedMs>0)
            updatedMs--;

        if(updatedS===0 && updatedM===0 && updatedH===0){
            setTimeFinish(true);
        }
        const print = converter(updatedH,updatedM,updatedS);
        setTimeShow(print);
        return setTime({ms:updatedMs, s:updatedS, m:updatedM, h:updatedH});
    };

    useEffect(()=>{
        if(status){
            run();
            setInterv(setInterval(run, 10));
        }
        else{
            clearInterval(interv);
        }
    },[status]);
    
    return <div>
        {/* <button onClick={()=>{
            setStatus(!status);
        }}>Start</button> */}
        <div>
            <div>{timeShow}</div>
        </div>
    </div>
}

export default CountDown;