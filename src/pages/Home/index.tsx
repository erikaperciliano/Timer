import { HandPalm, Play } from "phosphor-react";
import { HomeContainer,  StartCountdownButton, StopCountdownButton } from "./styles";
import { useState, createContext } from "react";
import { NewcycleForm } from "./components/NewCycleForm/inde";
import { Countdown } from "./components/Countdown";
interface Cycle {
    id: string
    task: string
    minutesAmount: number
    startDate: Date
    interruptDate?: Date
    finishedDate?: Date
}

interface CyclesContextType {
    activeCycle: Cycle | undefined
    activeCycleId: string | null
    markCurrentCycleAsFinished: () => void
}

export const CyclesContext = createContext({} as CyclesContextType);


export function Home() {
    const [cycles, setCycles] = useState<Cycle[]>([]);
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  
    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

    function markCurrentCycleAsFinished() {
        setCycles((state) => 
            state.map((cycle) => {
                if(cycle.id === activeCycleId) {
                    return { ...cycle, finishedDate: new Date() }
                } else {
                    return cycle
                }
            })
        )
    }

    // function handleCreateNewCycle(data: NewCycleFormData){
    //     const id = String(new Date().getTime())
    //     const newCycle: Cycle = {
    //         id, 
    //         task: data.task,
    //         minutesAmount: data.minutesAmount,
    //         startDate: new Date()
    //     }

    //     setCycles((state) => [...state, newCycle])
    //     setActiveCycleId(id)
    //     setAmountSecondPassed(0)

    //     reset();
    // }

    function handleInterruptCycle() {
        setCycles((state) =>
            state.map((cycle) => {
                if(cycle.id === activeCycleId) {
                    return { ...cycle, interruptDate: new Date() }
                } else {
                    return cycle
                }
            })
        )

        setActiveCycleId(null)
    }
    
  

    // const task = watch('task')
    // const isSubmitDisabled = !task;

    return (
        <HomeContainer>
            <form /*onSubmit={handleSubmit(handleCreateNewCycle)} */ action="">
                <CyclesContext.Provider value={{ activeCycle, activeCycleId, markCurrentCycleAsFinished }}>
                    {/* <NewcycleForm /> */}
                    <Countdown />
                </CyclesContext.Provider>
                {
                    activeCycle ? (
                        <StopCountdownButton onClick={handleInterruptCycle} type="button">
                            <HandPalm size={24} />
                            Interrupt
                        </StopCountdownButton>
                    ) : (
                        <StartCountdownButton /*disabled={isSubmitDisabled}*/ type="submit">
                            <Play size={24} />
                            Start
                        </StartCountdownButton>
                    )
                }
               
            </form>
        </HomeContainer>
    )
}