import { endopints } from "./constants"
import request from "../../../utils/axios/service"

class Capabilities {
  static getTechCount() {
    return request.get(endopints.GET_TECH_COUNT)
  }
  static getPieCount() {
    return request.get(endopints.GET_PIE_COUNT)
  }
}
