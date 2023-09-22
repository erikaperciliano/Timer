import { HandPalm, Play } from "phosphor-react"
import { HomeContainer, StartCountDownButton, StopCountDownButton } from "./styles"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as zod from 'zod'
import { useContext } from "react"
import { Countdown } from "./components/Countdown"
import { NewCycleForm } from "./components/NewCycleForm"
import { CyclesContext } from "../../contexts/CyclesContext"


const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Report the task!'),
    minutesAmount: zod.number().min(5).max(60)
})

type newCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export const Home = () => {
    const { activeCycle, createNewCycle, interruptCurrentCycle } =  useContext(CyclesContext)

    const newCycleForm = useForm<newCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0
        }
    });

const { handleSubmit, watch , reset } = newCycleForm

    const handleCreateNewCycle = (data: newCycleFormData) => {
        createNewCycle(data)
        reset()
    }

    const task = watch('task');
    const isSubmitDisabled = !task;

    return(
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
                    <FormProvider {...newCycleForm}>
                        <NewCycleForm/>
                    </FormProvider>
                    <Countdown/>
                {activeCycle ? (
                    <StopCountDownButton onClick={interruptCurrentCycle} type="button">
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