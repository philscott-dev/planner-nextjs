import { ConfigInterface } from 'swr'
import fetcher from 'services/api'

const swrConfig: ConfigInterface = {
  fetcher,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  revalidateOnMount: true, //make sure this is true
}

export default swrConfig
