import { useEffect } from 'react'

import { useData } from '../Form/useForm'


const VerifyToken = ({ endpoint }) => {
  const { $auth } = useData()
  const token = $auth.token
  useEffect(() => {
    $auth.verifyToken(endpoint)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  return null
}

export default VerifyToken
