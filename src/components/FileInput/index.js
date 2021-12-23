import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import classNames from 'classnames'

import BaseComponent from 'core/BaseComponent'
import { Component } from 'core/pageStore'
import Context from '../Context'

import LoadingIndicator from '../LoadingIndicator'

import style from './index.module.css'
import transform from './transform'


class FileInput extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    errors: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
    accept: PropTypes.string,

    onUpload: PropTypes.func,
    endpoint: PropTypes.string,
  }

  static defaultProps = {
    errors: [],
    accept: '*',
  }

  constructor(props) {
    super(props)
    this.state = {}
    this.uploadFile = this.uploadFile.bind(this)
  }

  uploadFile(e) {
    const { files = [] } = e.target
    const file = files[0]
    const { onUpload, endpoint } = this.props

    if (file) {
      const formData = new FormData()
      formData.append('file', file)

      this.setState({ uploading: true })
      fetch(endpoint, {
        method: 'POST',
        body: formData,
      })
        .then(resp => {
          resp.json()
            .then(data => {
              onUpload && onUpload(data)
            })
            .catch(console.error)
        })
        .catch(console.error)
        .finally(() => {
          this.setState({ uploading: false })
        })
    }
  }

  render() {
    const {
      value,
      valueComponent,
      labelComponent,
      className,
      disabled,
      errors,
      accept,
    } = this.props

    const { uploading } = this.state

    const labelComponentStore = Component.create({ nodes: [labelComponent] })
    const valueComponentStore = Component.create({ nodes: [valueComponent] })

    return (
      <div {...{
        className: style.root,
      }} >
        <label {...{
          className: classNames(
            className,
            style.inputContainer,
            errors.length && style.error,
            disabled && style.disabled,
          ),
        }}>
          {!uploading && (
            <BaseComponent component={labelComponentStore} />
          )}
          {uploading && <LoadingIndicator size={32} />}
          <input {...{
            className: style.fileInput,
            type: 'file',
            'data-cy': 'upload_button',
            accept,
            disabled,
            onChange: this.uploadFile,
          }} />
        </label>
        {value && valueComponentStore && (
          <Context context={value}>
            <BaseComponent component={valueComponentStore} />
          </Context>
        )}
        {!!errors.length &&
          <div className={style.errors}>
            {errors.map((error, index) => (
              <div className={style.errorText} key={index}>
                {error}
              </div>
            ))}
          </div>
        }
      </div>
    )
  }
}

FileInput.transformFunctions = transform

export default FileInput
