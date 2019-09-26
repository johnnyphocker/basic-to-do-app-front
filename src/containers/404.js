import React from 'react';
import { withRouter } from 'react-router-dom';

const NoMatch = (props) => {

    return(
        <section className="container horizontal">
            <p>No existe la ruta seleccionada</p>
            <button className='alert' onClick={() => props.history.goBack()}>Regresar</button>
        </section>
    )
}

export default withRouter(NoMatch);