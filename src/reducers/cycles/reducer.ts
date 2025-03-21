import { produce } from "immer"
import { ActionTypes } from "./actions"


export interface Cycle {
    id: string
    task: string
    minutesAmount: number
    startDate: Date
    interruptDate?: Date
    finishedDate?: Date
}

interface CyclesState {
    cycles: Cycle[]
    activeCycleId: string | null
}

export type CycleAction =
    | { type: ActionTypes.ADD_NEW_CYCLE; payload: { newCycle: Cycle } }
    | { type: ActionTypes.INTERRUPT_CURRENT_CYCLE }
    | { type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED }


export function cyclesReducer(state: CyclesState, action: unknown) {
    const typedAction = action as CycleAction; // Type assertion
    switch(typedAction.type) {
        case ActionTypes.ADD_NEW_CYCLE:
            return produce(state, (draft) => {
                draft.cycles.push(typedAction.payload.newCycle)
                draft.activeCycleId = typedAction.payload.newCycle.id
            })
        case ActionTypes.INTERRUPT_CURRENT_CYCLE: {
            const currentCycleIndex = state.cycles.findIndex((cycle) => {
                return cycle.id === state.activeCycleId
            })

            if(currentCycleIndex < 0) {
                return state
            }

            return produce(state, (draft) => {
                draft.activeCycleId = null
                draft.cycles[currentCycleIndex].interruptDate = new Date()
            })
        }
           
        case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED: {
            const currentCycleIndex = state.cycles.findIndex((cycle) => {
                return cycle.id === state.activeCycleId
            })

            if(currentCycleIndex < 0) {
                return state
            }

            return produce(state, (draft) => {
                draft.activeCycleId = null
                draft.cycles[currentCycleIndex].finishedDate = new Date()
            })
        }
        default: 
            return state
    }
}