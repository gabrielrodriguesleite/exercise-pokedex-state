import React from 'react';
import Pokemon from './Pokemon';

class Pokedex extends React.Component {
    constructor() {
        super();
        this.state = {
            tipos: ['Fire', 'Psychic'],
            atualizar: false,
        };
        this.proximo = this.proximo.bind(this);
        this.filtro = this.filtro.bind(this);
    }
    
    filtro(f) {
        localStorage.setItem('filtro', f);
        this.setState(estadoAnt => Object.assign({}, estadoAnt, {atualizar: !estadoAnt.atualizar}));
    }

    proximo() {
        this.setState(estadoAnt => Object.assign({}, estadoAnt, {atualizar: !estadoAnt.atualizar}));
        localStorage.setItem('indice', parseInt(localStorage.getItem('indice')) + 1);
    }
        
    render() {
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
            } else {
                const pokes = this.props.pokemons;
                if (pokes.length <= localStorage.getItem('indice')) localStorage.setItem('indice', '0');
                poke = pokes[localStorage.getItem('indice')]
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
                    <div className="tipos">{
                        this.state.tipos.map((p) => <button onClick={() => this.filtro(p)} key={p} >{p}</button>)
                        }
                    </div>
                    <button onClick={this.proximo}>Próximo</button>
                </div>
            </>
        );
    }
}

export default Pokedex;