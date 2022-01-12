import React, {useRef}  from "react";

const Card = (props) => {
    const dataCard = props.data,
        setPar = props.set,
        type = dataCard.types[0].type.name,
        id= props.id,
        name = (dataCard.name),
        sprite_default = dataCard.sprites.front_default,
        stats = dataCard.stats,
        types = dataCard.types,
        cont = props.cont,
        setId = props.setId,
        setCont= props.setCont,
        setStart= props.setStart,
        fixed= props.fixed; 
    const reference = useRef();

    return <div id={id} className={"center card-container "+(fixed?"fixed":"")} ref={reference}
            >
        <figure onClick={async()=>{
                console.log(dataCard)
                let par = (props.par?props.par:[]);
                let parId = (props.parId?props.parId:[]);
                let cardClass = reference.current.className.split(' ');
                if(!(cardClass.includes('fixed')) && !(cardClass.includes('find'))){
                    setCont(cont+1)
                    if(!(cardClass.includes('animating'))){
                        par.push(reference.current)
                        parId.push(id)
                        reference.current.className+='animating';
                    }
                    else{
                        reference.current.className = cardClass[0]+" "+cardClass[1]+" "; 
                        if(par[0] === reference.current){
                            var remove =  par.splice(0,1);
                            var remove2 =  parId.splice(0,1);
                        }
                        else if(par[1] === reference.current){
                            var remove =  par.splice(1,1);
                            var remove2 =  parId.splice(1,1);
                        }
                    }
                    
                    setStart(true);
                    setPar(par)
                    setId(parId)
                }
                
            }}>
            <div className={"front "+type}>
                <p className="pokemon-name">{name}</p>
                <img src={sprite_default} className="pokemon-sprite"/>
                <div className="pokemon-stats">
                    {
                        stats?stats.map((e)=>{
                            const plus = Math.floor((Math.random() * (800 - 1 + 1)) + 1);
                            return <div key={e.base_stat+plus} className="stat"><div className="stat-name">{e.stat.name+" "}</div><div className="stat-number">{": "+e.base_stat}</div></div>
                        }):null
                    }
                </div>
                <div className="pokemon-types">
                    {
                        types?types.map((e)=>{
                            const plus = Math.floor((Math.random() * (800 - 1 + 1)) + 1);
                            return <div key={e.slot+plus} className="type"><div className={"type-"+e.type.name}>{e.type.name}</div></div>
                        }):null
                    }
                </div>
            </div>
            <div className="back">
            </div>
        </figure>
    </div>
}

export default Card