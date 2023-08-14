import { Play } from "phosphor-react"
import { CountDownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountDownButton, TaskInput } from "./styles"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as zod from 'zod'
import { useState } from "react"

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Report the task!'),
    minutesAmount: zod.number().min(5).max(60)
})

type newCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
    id: string;
    task: string;
    minutesAmount: number;
}

export const Home = () => {
    const [cycles, setCycles] = useState<Cycle[]>([]);
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

    const { register, handleSubmit, watch, reset} = useForm<newCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0
        }
    });

    const handleCreateNewCycle = (data: newCycleFormData) => {
        const id =  String(new Date().getTime());
        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount
        }

        setCycles((state) => [...state, newCycle])
        setActiveCycleId(id)
        reset();
    }

    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
    console.log(activeCycle)

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
                        min={5} 
                        max={60}
                        {...register('minutesAmount', { valueAsNumber: true})}
                    />

                    <span>minutes.</span>
                </FormContainer>

                <CountDownContainer>
                    <span>0</span>
                    <span>0</span>
                    <Separator>:</Separator>
                    <span>0</span>
                    <span>0</span>
                </CountDownContainer>

                <StartCountDownButton disabled={isSubmitDisabled} type="submit">
                    <Play size={24}/>
                    Start
                </StartCountDownButton>
            </form>
        </HomeContainer>
    )
}