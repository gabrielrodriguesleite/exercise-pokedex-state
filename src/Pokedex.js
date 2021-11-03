import React from 'react';
import Pokemon from './Pokemon';

class Pokedex extends React.Component {
    constructor() {
        super();
        this.state = { indice: 0 };
        this.proximo = this.proximo.bind(this);
    }

    proximo() {
        if (this.props.pokemons.length-1 > this.state.indice) {
            this.setState((estadoAnterior) => ({indice: estadoAnterior.indice + 1}));
        } else { this.setState((estadoAnterior) => ({ indice: 0 }))}
    }

    render() {
        return (
            <div>
                <div className="pokedex">
                    {/* {this.props.pokemons.map(pokemon => <Pokemon key={pokemon.id} pokemon={pokemon} />)} */}
                    <Pokemon 
                        key={this.props.pokemons[this.state.indice]} 
                        pokemon={this.props.pokemons[this.state.indice]} 
                        />
                </div>
                <button onClick={this.proximo}>Próximo</button>
            </div>
        );
    }
}

export default Pokedex;