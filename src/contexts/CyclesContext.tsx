import { ReactNode, createContext, useReducer, useState } from "react";
import { ActionTypes, Cycle, CyclesReducer } from '../reducers/cycles'
interface CreateCycleData {
    task: string;
    minutesAmount: number;
}
interface CyclesContextType {
    cycles: Cycle[]
    activeCycle: Cycle | undefined
    activeCycleId: string | null
    amountSecondsPassed: number
    markCurrentCycleAsFinished: () => void
    setSecondsPassed: (seconds: number) => void
    createNewCycle: (data: CreateCycleData) => void
    interruptCurrentCycle: () => void
}

export const CyclesContext = createContext({} as CyclesContextType)

interface CyclesContextProviderProps {
    children: ReactNode
}


export function CyclesContextProvider({ children }: CyclesContextProviderProps){
    const [cyclesState, dispatch] = useReducer(CyclesReducer, 
    {
        cycles: [],
        activeCycleId: null
    })

    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

    const { cycles, activeCycleId } = cyclesState


    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

    const setSecondsPassed = (seconds: number) => {
        setAmountSecondsPassed(seconds)
    }

    const markCurrentCycleAsFinished = () => {
        dispatch({
            type: ActionTypes.MARK_CURRENT_CYCLE_FINISHED,
            payload: {
                activeCycleId
            }
        })
    }

    const createNewCycle = (data: CreateCycleData) => {
        const id =  String(new Date().getTime());
        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),
        }

        dispatch({
            type:ActionTypes.ADD_NEW_CYCLE,
            payload: {
                newCycle
            }
        })
        setAmountSecondsPassed(0)
    }

    const interruptCurrentCycle = () => {
        dispatch({
            type:ActionTypes.INTERRUP_CURRENT_CYCLE,
            payload: {
                activeCycleId
            }
        })
    }

    
    return(
        <CyclesContext.Provider 
            value={{ 
                cycles,
                activeCycle, 
                activeCycleId, 
                markCurrentCycleAsFinished, 
                amountSecondsPassed, 
                setSecondsPassed,
                createNewCycle,
                interruptCurrentCycle
            }}>
                {children}
        </CyclesContext.Provider>
    )
}