import { HandPalm, Play } from "phosphor-react"
import { CountDownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountDownButton, StopCountDownButton, TaskInput } from "./styles"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as zod from 'zod'
import { useEffect, useState } from "react"
import differenceInSeconds from "date-fns/differenceInSeconds"

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Report the task!'),
    minutesAmount: zod.number().min(1).max(60)
})

type newCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptedDate?: Date;
    finishedDate?: Date;
}

export const Home = () => {
    const [cycles, setCycles] = useState<Cycle[]>([]);
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
    const [amountSecondPassed, setAmountSecondPassed] = useState(0)

    const { register, handleSubmit, watch, reset} = useForm<newCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0
        }
    });

    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

    useEffect(() => {
        let interval: number;

        if(activeCycle){
            setInterval(() => {
                const secondsDifference = differenceInSeconds(new Date(), activeCycle.startDate )

                if(secondsDifference >= totalSeconds){
                    setCycles(state => state.map((cycle) => {
                        if(cycle.id === activeCycleId){
                            return { ...cycle, finishedDate: new Date() }
                        }else {
                            return cycle
                        }
                    }),
                    )

                    setAmountSecondPassed(totalSeconds)
                    clearInterval(interval)

                }else {
                    setAmountSecondPassed(secondsDifference)
                }
            }, 1000)
        }

        return () => {
            clearInterval(interval)
        }

    }, [activeCycle, totalSeconds, activeCycleId])

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
        setAmountSecondPassed(0)

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

    const currentSecond = activeCycle ? totalSeconds - amountSecondPassed: 0

    const minutesAmount = Math.floor(currentSecond / 60)
    const secondsAmount = currentSecond % 60

    const minutes = String(minutesAmount).padStart(2, '0')
    const seconds = String(secondsAmount).padStart(2, '0') 

   useEffect(() => {
    if(activeCycle){
        document.title = `${minutes} : ${seconds}`
    }
   }, [minutes, seconds, activeCycle])

    const task = watch('task');
    const isSubmitDisabled = !task;

    return(
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
                <FormContainer>
                    <label htmlFor="task">I will work in</label>
                    <TaskInput 
                        list="task-sugestions" 
                        id="task" 
                        placeholder="Give a name for you project"
                        disabled={!!activeCycle}
                        {...register('task')}
                    />
                    
                    <datalist id="task-sugestions">
                        <option>Project 1</option>
                        <option>Project 2</option>
                        <option>Project 3</option>
                        <option>Project 4</option>
                    </datalist>

                    <label htmlFor="minutesAmount">During</label>
                    <MinutesAmountInput 
                        type='number' 
                        id="minutesAmount" 
                        placeholder="00" 
                        step={5} 
                        min={1} 
                        max={60}
                        disabled={!!activeCycle}
                        {...register('minutesAmount', { valueAsNumber: true})}
                    />

                    <span>minutes.</span>
                </FormContainer>

                <CountDownContainer>
                    <span>{minutes[0]}</span>
                    <span>{minutes[1]}</span>
                    <Separator>:</Separator>
                    <span>{seconds[0]}</span>
                    <span>{seconds[1]}</span>
                </CountDownContainer>

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