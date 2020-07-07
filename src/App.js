import React, { Component } from 'react'
import Countries from './Components/countries/Countries'
import Header from './Components/header/Header'

export default class App extends Component {
  constructor() {
    super()

    this.state = {
      allCountries: [],
      filteredCountries: [],
      filteredPopulation: 0,
      filter: ''
    }
  }

  async componentDidMount() {
    const res = await fetch('https://restcountries.eu/rest/v2/all') 
    const json = await res.json()

    const allCountries = json.map(({ name, population, flag, numericCode }) => {
      return {
        name, 
        filterName: name.toLowerCase(),
        population,
        flag,
        id: numericCode
      }
    })

    const filteredPopulation = this.calculateTotalPopulationFrom(allCountries)

    this.setState({
      allCountries,
      filteredCountries: Object.assign([], allCountries),
      filteredPopulation,
    })
  }

  calculateTotalPopulationFrom = (countries) => {
    const totalPopulation = countries.reduce((acc, curr) => {
      return acc + curr.population
    }, 0)
    return totalPopulation
  }

  handleChangeFilter = (newText) => {
    this.setState({
      filter: newText,
    })
    const filterLowerCase = newText.toLowerCase()

    const filteredCountries = this.state.allCountries.filter((country) => {
      return country.filterName.includes(filterLowerCase)
    })

    const filteredPopulation = this.calculateTotalPopulationFrom(filteredCountries)
    
    this.setState({
      filteredCountries,
      filteredPopulation,
    });
  }

  render() {
    const { filter, filteredCountries, filteredPopulation } = this.state;
    
    return (
      <div className="container">
        <h2 style={styles.centerText}>React Countries</h2>
        <Header filter={filter} onChangeFilter={this.handleChangeFilter} arrayCountries={filteredCountries} population={filteredPopulation}/>
        <Countries countries={filteredCountries} />
      </div>
    );
  }
}

const styles = {
  centerText: {
    textAlign: 'center',
  }
}

