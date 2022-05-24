import React, { useState } from 'react'
import { useNode } from '@craftjs/core'
import { TCheckbox, JsonEditor, TInput, TButton, TSelect } from '$trood/components'

import styles from './index.module.css'
import ImageGallery from '../../index'


const Settings = ({ openDataSelector }) => {
  const {
    id,
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }))

  const defaultType = Array.isArray(props.images) ? 'static' : 'data'
  const [type, setType] = useState(defaultType)

  return (
    <>
      <div>
        <div className={styles.tabs}>
          <div
            className={type === 'static' ? styles.activeTab : styles.tab}
            onClick={() => {
              setProp((props) => props.images = [])
              setType('static')
            }}
          >
            Static Images
          </div>
          <div
            className={type === 'data' ? styles.activeTab : styles.tab}
            onClick={() => {
              setProp((props) => props.images = {})
              setType('data')
            }}
          >
            From Data
          </div>
        </div>
        {type === 'static' && (
          <JsonEditor.default {...{
            value: props.images,
            mode: JsonEditor.MODES.code,
            onChange: vals => setProp((props) => props.images = vals),
          }} />
        )}
        {type === 'data' && (
          <TButton.default
            type={TButton.BUTTON_TYPES.text}
            specialType={TButton.BUTTON_SPECIAL_TYPES.data}
            label="Select Items"
            onClick={() => openDataSelector(id, {
              id: props.images?.$data,
              title: 'Images',
              values: props.images,
              onSubmit: value => {
                setProp((props) => {
                  props.images = value
                })
              },
            })}
          />
        )}
      </div>
      <TInput.default {...{
        label: 'Original Image Path',
        value: props.imageOriginalPath,
        onChange: value => setProp((props) => props.imageOriginalPath = value),
      }} />
      <TInput.default {...{
        label: 'Thumbnail Image Path',
        value: props.imageThumbnailPath,
        onChange: value => setProp((props) => props.imageThumbnailPath = value),
      }} />
      <TInput.default {...{
        label: 'Fullscreen Image Path',
        value: props.imageFullscreenPath,
        onChange: value => setProp((props) => props.imageFullscreenPath = value),
      }} />
      <TCheckbox.default {...{
        label: 'Infinite Scroll',
        value: props.infinite,
        onChange: value => {
          setProp((props) => props.infinite = value)
        },
      }} />
      <TCheckbox.default {...{
        label: 'Show Navigation',
        value: props.showNav,
        onChange: value => {
          setProp((props) => props.showNav = value)
        },
      }} />
      <TCheckbox.default {...{
        label: 'Show Thumbnails',
        value: props.showThumbnails,
        onChange: value => {
          setProp((props) => props.showThumbnails = value)
        },
      }} />
      <TSelect.default {...{
        label: 'Thumbnails Position',
        placeHolder: 'Not Set',
        items: ImageGallery.thumbnailPositions.map(value => ({ value })),
        values: [props.thumbnailPosition],
        onChange: vals => setProp((props) => props.thumbnailPosition = vals[0]),
      }} />
      <TCheckbox.default {...{
        label: 'Show Fullscreen',
        value: props.showFullscreenButton,
        onChange: value => {
          setProp((props) => props.showFullscreenButton = value)
        },
      }} />
      <TCheckbox.default {...{
        label: 'Show Play',
        value: props.showPlayButton,
        onChange: value => {
          setProp((props) => props.showPlayButton = value)
        },
      }} />
      <TCheckbox.default {...{
        label: 'Auto Play',
        value: props.autoPlay,
        onChange: value => {
          setProp((props) => props.autoPlay = value)
        },
      }} />
      <TCheckbox.default {...{
        label: 'Show Index',
        value: props.showIndex,
        onChange: value => {
          setProp((props) => props.showIndex = value)
        },
      }} />
      <TCheckbox.default {...{
        label: 'Disable Hot Keys',
        value: props.disableKeyDown,
        onChange: value => {
          setProp((props) => props.disableKeyDown = value)
        },
      }} />
    </>
  )
}

export default Settings
