import useFetchFlowers from '../../CustomHooks/useFetchFlowers'
import { Flowers } from '../../Types/types'
import FlowerCards from '../FlowerCards/FlowerCards'
import Loading from '../Loading/Loading'

const Home = () => {
  const flowersResponse: Flowers | null = useFetchFlowers('api/v1/flowers')
  return (
    <div>
      {flowersResponse ? (
        <FlowerCards type="home" flowers={flowersResponse} />
      ) : (
        <Loading />
      )}
    </div>
  )
}

export default Home
