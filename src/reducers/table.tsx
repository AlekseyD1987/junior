import {FETCH_TABLE_START, FETCH_TABLE_SUCCESS, FETCH_TABLE_ERROR, CHANGE_TABLE} from '../actions/actionTypes'

const initialState = {
  table: [],
  loading: false,
  isFinished: false,
  error: null
}

export function tableReducer(state = initialState, action: any) {
  switch (action.type) {
	case FETCH_TABLE_START:
	  return {
		...state, loading: true
	  }
	case FETCH_TABLE_SUCCESS:
	  return {
		...state, loading: false, isFinished: true, table: action.table
	  }
	case FETCH_TABLE_ERROR:
	  return {
		...state, loading: false, error: action.error
	  }
	case CHANGE_TABLE:
	  return { 
		...state, isFinished: true, loading: false, table: action.payload 
	  }
    default:
      return state
  }
}
