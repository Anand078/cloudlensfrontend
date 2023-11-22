import { combineReducers } from "redux";
import dashboardReducer from "../../services/capabilities/reducer";

const rootReducer = combineReducers({
  dashboard: dashboardReducer,
});

export default rootReducer;
