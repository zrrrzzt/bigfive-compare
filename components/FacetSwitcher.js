'use strict'

import Button from 'muicss/lib/react/button'

export default (props) => (
  <div>
    <Button variant='raised' onClick={props.clickHandler} key='facet-switcher-domains' data-type='domains'>Domains</Button>
    {
      Object.keys(props.facets).map(facet => (<Button variant='raised' onClick={props.clickHandler} key={facet} data-type='facet' data-facet={facet}>{props.facets[facet].title}</Button>))
    }
  </div>
)
