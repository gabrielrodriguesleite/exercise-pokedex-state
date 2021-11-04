import React from 'react';
import Pokemon from './Pokemon';

class Pokedex extends React.Component {
    constructor() {
        super();
        this.state = {
            tipos: ['All'], // , 'Fire', 'Psychic'],
            atualizar: false,
        };
        this.proximo = this.proximo.bind(this);
        this.filtro = this.filtro.bind(this);
    }
    
    filtro(f) {
        localStorage.setItem('filtro', f);
        localStorage.setItem('indice', 0);
        this.setState(estadoAnt => Object.assign({}, estadoAnt, {atualizar: !estadoAnt.atualizar}));
    }

    proximo() {
        this.setState(estadoAnt => Object.assign({}, estadoAnt, {atualizar: !estadoAnt.atualizar}));
        localStorage.setItem('indice', parseInt(localStorage.getItem('indice')) + 1);
    }
        
    render() {
        let proximo = 'initial';
        let poke = this.props.pokemons[0];
        if (!Object.keys(localStorage).includes('filtro')) {
            localStorage.setItem('filtro', 'All');
            localStorage.setItem('indice', '0');
        }
        else {
            if (localStorage.getItem('filtro') !== 'All') {
                const pokes = this.props.pokemons.filter( p => p.type === localStorage.getItem('filtro'));
                if (pokes.length <= localStorage.getItem('indice')) localStorage.setItem('indice', '0');
                poke = pokes[localStorage.getItem('indice')];
                pokes.length - 1 ? proximo = 'initial' : proximo = 'none';
            } else {
                const pokes = this.props.pokemons;
                if (pokes.length <= localStorage.getItem('indice')) localStorage.setItem('indice', '0');
                poke = pokes[localStorage.getItem('indice')]
                pokes.length - 1 ? proximo = 'initial' : proximo = 'none';
            }
        }

        return (
            <>
                <div className="pokedex">
                    <Pokemon 
                        key={poke}
                        pokemon={poke}
                        />
                </div>
                <div className="botoes">
                    <div className="tipos">
                        {this.state.tipos.map((p) => <button onClick={() => this.filtro(p)} key={p} >{p}</button>)}                     
                        {this.props.pokemons.map(p => p.type).filter((v, i, arr) => i === arr.indexOf(v)).sort()
                            .map(p => <button onClick={() => this.filtro(p)} key={p} >{p}</button>)}
                    </div>
                    <button style={ { background: 'yellow',color: 'black', display: proximo } } onClick={this.proximo}>Próximo</button>
                </div>
            </>
        );
    }
}

export default Pokedex;