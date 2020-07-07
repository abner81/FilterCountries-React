import React, { Component } from 'react'
import { formatNumber } from '../../helpers/formatHelpers'
import css from './header.module.css'

export default class Header extends Component {
  handleChangeEvent = (event) => {
    const valueEvent = event.target.value
    this.props.onChangeFilter(valueEvent)
  }

  render() {
    const { filter, arrayCountries, population } = this.props
    return (
      <div className={css.flexRow}>
        <input placeholder='Busque um país' style={{width:'50%'}} type='text' value={filter} onChange={this.handleChangeEvent}/>
        <span className={css.countries}>Países: <strong>{arrayCountries.length}</strong> </span>
        <span className={css.population}>População: <strong>{formatNumber(population)}</strong>  </span>
      </div>
    )
  }
}
