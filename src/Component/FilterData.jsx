import React, { useEffect, useState } from 'react'
import { pokemons, buttons } from "./Datafilter";
import Data from './Datafilter';


function FilterData() {
    const [filtredPokemon, setFiltredPokemon] = useState(null);

    useEffect(() => {
        setFiltredPokemon(pokemons);
      }, []);

    function handlePokemon(e) {
        let value = e.target.value;
        value !== 'all' ? setFiltredPokemon(filterPokemon(value)) : setFiltredPokemon(pokemons);
    }

    function filterPokemon(e) {
        let filtredPokemon = pokemons.filter(type => type.tipo === e);
        return filtredPokemon;
      }

    const [item, setItem] = useState(Data);
    const [transition, setTransition] = useState(false);
    const menuItems = [...new Set(Data.map((Val) => Val.category))];

    const filterdata = (e) => {
        const item = Data.filter((val) => {
            return val.category === e;
        })
        setItem(item)
    }

    const filterdata1 = (category) => {
        setTransition(true)
        setTimeout(() => {
            if (category === "All") {
                setItem(Data)
            }
            else {
                const filter = Data.filter(item => item.category === category);
                setItem(filter)
            }
            setTransition(false);
        }, 300)

    }

  return (
    <>
    <div style={{margin: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {buttons &&
        buttons.map((type, index) => (
            <button style={{marginRight: '10px'}} key={index} value={type.value} onClick={handlePokemon}>
              {type.name}
            </button>
        ))}
    </div>
        <div style={{marginTop: '30px'}}>
            <ul style={{display: 'grid', margin: '0 20px',padding: '0', gridTemplateColumns: '1fr 1fr',gap: '20px', listStyle: 'none'}}>
            { filtredPokemon &&
                filtredPokemon.map((type,index) => (
                    <>
                        <li style={{ height:"100px", background: 'red', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{type.nome}</li>
                    </>
                ))
            }
            </ul>
        </div>
        <div className='container-fluid' style={{margin: '0 30px'}}>
            <div>
                <h1 style={{textAlign: 'center'}}>Our Menu</h1>
            </div>
            <div style={{margin: '20px 0', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px'}}>
                <button onClick={() => filterdata1("All")}>All</button>
                <button onClick={() => filterdata1('Breakfast')}>Breakfast</button>
                <button onClick={() => filterdata1('Lunch')}>Lunch</button>
                <button onClick={() => filterdata1('Dinner')}>Dinner</button>
                <button onClick={() => filterdata1('Snacks')}>Snacks</button>
            </div>
            <div style={{margin: '30px 0', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px'}}>
            <button onClick={() => setItem(Data)}>All</button>
                {
                    menuItems.map((val, id) => {
                        return (
                            <div>
                                <button key={id} onClick={() => filterdata(val)}>{val}</button>
                            </div>
                        )
                    })
                }
            </div>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '20px'}}>
                {
                    item.map((val) => {
                        return (
                            <div key={val.id} style={{overflow: 'hidden', textAlign: 'center', transition: '0.3s ease-in linear', opacity: '0.3s', transform : transition ? 'translateX(-100%) scaleX(0)' : 'translateX(0) scaleX(1)', opacity: transition ? 0 : 1}}>
                                <img style={{width: '200px', transition: ' 0.3s ease-in linear'}} src={val.img} alt={val.title} />
                                <div style={{margin: '10px 0'}}>
                                    <h4>{val.title}</h4>
                                    <p style={{margin: '10px 0'}}>{val.price}</p>
                                    <p>{val.desc}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
        </>
  )
}

export default FilterData
