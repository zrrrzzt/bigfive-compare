'use strict'

import Button from 'muicss/lib/react/button'

export default (props) => (
  <div>
    <h2>Filter</h2>
    {
      props.data.map(item => (<Button variant='raised' onClick={props.clickHandler} key={item.id} color={props.filtered.includes(item.id) ? 'primary' : ''} data-type='comparison' data-comparison={item.id}>{item.name}</Button>))
    }
  </div>
)
