import { ConfigInterface } from 'swr'
import fetcher from 'services/api'

const swrConfig: ConfigInterface = {
  fetcher,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  revalidateOnMount: true, //make sure this is true
}

export default swrConfig
