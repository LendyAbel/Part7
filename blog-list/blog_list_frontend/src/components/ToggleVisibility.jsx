import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button } from '@mui/material'

const ToggleVisibility = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })
  return (
    <div>
      <div style={hideWhenVisible}>
        <Button variant="contained" sx={{ mb: 2 }} onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button variant="contained" color="error" sx={{ mt: 1, mb: 1 }} onClick={toggleVisibility}>
          cancel
        </Button>
      </div>
    </div>
  )
})

ToggleVisibility.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

ToggleVisibility.displayName = 'ToggleVisibility'

export default ToggleVisibility
