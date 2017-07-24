'use strict'

import Button from 'muicss/lib/react/button'

export default (props) => (
  <div>
    <Button variant='raised' onClick={props.clickHandler} color={props.show === 'domains' ? 'primary' : ''} key='facet-switcher-domains' data-type='domains'>Domains</Button>
    {
      Object.keys(props.facets).map(facet => (<Button variant='raised' onClick={props.clickHandler} color={props.show === facet ? 'primary' : ''} key={facet} data-type='facet' data-facet={facet}>{props.facets[facet].title}</Button>))
    }
  </div>
)
