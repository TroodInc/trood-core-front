import { useEffect, useState } from 'react'

const useStoreConfig = (url, getToken = () => {}) => {
  const [{ loading, err, storeConfig }, setState] = useState({ loading: true, storeConfig: {} })

  useEffect(() => {
    let update = setState
    if (url) {
      update({ loading: true, storeConfig: {} })
      const token = getToken()
      const fetchOptions = {}
      if (token) {
        fetchOptions.headers = {
          'Authorization': getToken(),
        }
      }
      fetch(url, fetchOptions)
        .then(res => {
          res.json()
            .then(storeConfig => {
              update({ loading: false, storeConfig, err: undefined })
            })
            .catch(err => update({ loading: false, storeConfig: {}, err }))
        })
        .catch(err => update({ loading: false, storeConfig: {}, err }))
    } else {
      update({ loading: false, storeConfig: {}, err })
    }
    return () => {
      update = () => {}
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, getToken])

  return [loading, err, storeConfig]
}

export default useStoreConfig
