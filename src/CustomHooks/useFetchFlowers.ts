import { useEffect, useState } from 'react'
import { Flowers } from '../Types/types'
import axios, { CancelTokenSource } from 'axios'

const useFetchFlowers = (url: string) => {
  const [data, setData] = useState<Flowers | null>(null)
  useEffect(() => {
    const cancelToken: CancelTokenSource = axios.CancelToken.source()
    async function fetchFlowers(): Promise<void> {
      try {
        const response = await axios.get<Flowers>(url, {
          cancelToken: cancelToken.token,
        })
        setData(response.data)
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Request canceled:', error.message)
        } else {
          console.warn(error)
        }
      }
    }
    fetchFlowers()
    return () => {
      cancelToken.cancel('Component unmounted')
    }
  }, [url])
  return data
}

export default useFetchFlowers
