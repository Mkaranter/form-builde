import React from 'react'
import PropTypes from 'prop-types'

import RenderFormTree from './GeneratedForm/RenderFormTree'

function GeneratedForm({ formData }) {
    return <RenderFormTree formData={formData} />
}

export default GeneratedForm

GeneratedForm.propTypes = {
    formData: PropTypes.array.isRequired,
}
