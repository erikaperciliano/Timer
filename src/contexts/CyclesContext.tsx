import { createContext, ReactNode, useEffect, useReducer, useState } from "react"
import { Cycle, cyclesReducer } from "../reducers/cycles/reducer"
import { addNewCycleAction, interruptCurrentCyclesAction, markCurrentCycleAsFinishedAction } from "../reducers/cycles/actions"
import { differenceInSeconds } from "date-fns"

interface CreateCycleData {
    task: string
    minutesAmount: number
}


interface CyclesContextType {
    cycles: Cycle[]
    activeCycle: Cycle | undefined
    activeCycleId: string | null
    amountSecondPassed: number
    markCurrentCycleAsFinished: () => void
    setSecondsPassed: (seconds: number) => void
    createNewCycle: ( data: CreateCycleData) => void
    interruptCurrentCycle: () => void
}

export const CyclesContext = createContext({} as CyclesContextType)

interface CyclesContextProviderProps {
    children: ReactNode
}

export function CyclesContextProvider({ children }: CyclesContextProviderProps) {
    const [cyclesState, dispatch] = useReducer(cyclesReducer, {
        cycles: [],
        activeCycleId: null
    }, (initialState) => {
        const storedStateJSON = localStorage.getItem('timer:cycles-state-1.0.0')

        if(storedStateJSON) {
            return JSON.parse(storedStateJSON)
        }

        return initialState
    });

    const { cycles, activeCycleId } = cyclesState;
    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

    const [amountSecondPassed, setAmountSecondPassed] = useState(() => {
        if(activeCycle) {
            return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
        }
   
        return 0
    });

    useEffect(() => {
        const stateJSON = JSON.stringify(cyclesState)

        localStorage.setItem('timer:cycles-state-1.0.0', stateJSON)
    }, [cyclesState])


    function setSecondsPassed(seconds: number) {
        setAmountSecondPassed(seconds)
    }

    function markCurrentCycleAsFinished() {
        dispatch(markCurrentCycleAsFinishedAction())
    }

    function createNewCycle(data: CreateCycleData){
        const id = String(new Date().getTime())
        const newCycle: Cycle = {
            id, 
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date()
        }

        dispatch(addNewCycleAction(newCycle))

        setAmountSecondPassed(0)
    }

    function interruptCurrentCycle() {
        dispatch(interruptCurrentCyclesAction())
    }
    
  
    return(
        <CyclesContext.Provider 
            value={{
                cycles,
                activeCycle,
                activeCycleId,
                markCurrentCycleAsFinished, 
                amountSecondPassed,
                setSecondsPassed,
                createNewCycle,
                interruptCurrentCycle
            }}>
                {children}
        </CyclesContext.Provider>
    )
}