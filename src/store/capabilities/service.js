import { endopints } from "./endpoints"
import request from "utils/axios/service"

class Capabilities {
  getTechCount() {
    return request.get(endopints.GET_TECH_COUNT)
  }
}

export default Capabilities
