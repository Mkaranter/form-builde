import React from 'react'
import PropTypes from 'prop-types'

import RenderFormTree from './GeneratedForm/RenderFormTree'

function GeneratedForm({ formData }) {
    return (
        <>
            <h1>USER FORM</h1>
            <RenderFormTree formData={formData} />
        </>
    )
}

export default GeneratedForm

GeneratedForm.propTypes = {
    formData: PropTypes.array.isRequired,
}
