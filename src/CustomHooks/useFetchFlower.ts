import axios, { CancelTokenSource } from 'axios'
import { useEffect, useState } from 'react'
import { FlowersDetail } from '../Types/types'

const useFetchFlower = (url: string, id: string | undefined) => {
  const [flower, setFlower] = useState<FlowersDetail | null>(null)
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    const cancelToken: CancelTokenSource = axios.CancelToken.source()
    async function fetchFlowerDetail(): Promise<void> {
      try {
        const flowerDetail = await axios.get<FlowersDetail>(`${url}${id}`, {
          cancelToken: cancelToken.token,
        })
        setFlower(flowerDetail.data)
      } catch (error: any) {
        if (axios.isCancel(error)) {
          console.warn('Request canceled:', error.message)
        } else {
          setError(error.response.data.error)
          console.warn(error)
        }
      }
    }
    fetchFlowerDetail()
    return () => {
      cancelToken.cancel('Component unmounted')
    }
  }, [url, id])
  return { flower, error }
}

export default useFetchFlower
