import { HandPalm, Play } from "phosphor-react"
import { HomeContainer, StartCountDownButton, StopCountDownButton } from "./styles"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as zod from 'zod'
import { createContext, useState } from "react"
import { Countdown } from "./components/Countdown"
import { NewCycleForm } from "./components/NewCycleForm"

interface Cycle {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptedDate?: Date;
    finishedDate?: Date;
}

interface CyclesContextType {
    activeCycle: Cycle | undefined
    activeCycleId: string | null
    amountSecondsPassed: number
    markCurrentCycleAsFinished: () => void
    setSecondsPassed: (seconds: number) => void
}

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Report the task!'),
    minutesAmount: zod.number().min(5).max(60)
})

type newCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export const CyclesContext = createContext({} as CyclesContextType)

export const Home = () => {
    const [cycles, setCycles] = useState<Cycle[]>([]);
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

    const newCycleForm = useForm<newCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0
        }
    });

    const { handleSubmit, watch, reset } = newCycleForm

    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

    const setSecondsPassed = (seconds: number) => {
        setAmountSecondsPassed(seconds)
    }

    const markCurrentCycleAsFinished = () => {
        setCycles(state => state.map((cycle) => {
            if(cycle.id === activeCycleId){
                return { ...cycle, finishedDate: new Date() }
            }else {
                return cycle
            }
        }),
        )
    }

    const handleCreateNewCycle = (data: newCycleFormData) => {
        const id =  String(new Date().getTime());
        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),
        }

        setCycles((state) => [...state, newCycle])
        setActiveCycleId(id)
        setAmountSecondsPassed(0)

        reset();
    }

    const handleInterruptCycles = () => {
        setCycles(state =>
            state.map(cycle => {
                if(cycle.id === activeCycleId){
                    return { ...cycle, interruptedDate: new Date() }
                }else {
                    return cycle
                }
            })
        )

        setActiveCycleId(null);
    }

    const task = watch('task');
    const isSubmitDisabled = !task;

    return(
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
                <CyclesContext.Provider value={{ activeCycle, activeCycleId, markCurrentCycleAsFinished, amountSecondsPassed, setSecondsPassed }}>
                    <FormProvider {...newCycleForm}>
                        <NewCycleForm/>
                    </FormProvider>
                    <Countdown/>
                </CyclesContext.Provider>
                {activeCycle ? (
                    <StopCountDownButton onClick={handleInterruptCycles} type="button">
                        <HandPalm size={24}/>
                        Interrupt
                    </StopCountDownButton>
                ) : (
                    <StartCountDownButton disabled={isSubmitDisabled} type="submit">
                        <Play size={24}/>
                        Start
                    </StartCountDownButton>
                )
                }
                
            </form>
        </HomeContainer>
    )
}