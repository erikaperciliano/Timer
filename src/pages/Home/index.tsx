import { HandPalm, Play } from "phosphor-react";
import { HomeContainer,  StartCountdownButton, StopCountdownButton } from "./styles";
import { useContext } from "react";
import { NewcycleForm } from "./components/NewCycleForm/inde";
import { Countdown } from "./components/Countdown";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import * as zod from 'zod';
import { CyclesContext } from "../../contexts/CyclesContext";


const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Report the task'),
    minutesAmount: zod.number().min(1, 'The cycle must be at least 5 minutes.').max(60, 'The break must be a maximum of 60 minutes.'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
    const { activeCycle, createNewCycle, interruptCurrentCycle } = useContext(CyclesContext)

    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }
    });

    const { handleSubmit, watch, reset } = newCycleForm

   function handleCreateNewCyle(data: NewCycleFormData) {
    createNewCycle(data)
    reset()
   }
  

    const task = watch('task')
    const isSubmitDisabled = !task;

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCyle)}  action="">
                <FormProvider {...newCycleForm}>
                <NewcycleForm />
                </FormProvider>
                <Countdown />
                {
                    activeCycle ? (
                        <StopCountdownButton onClick={interruptCurrentCycle} type="button">
                            <HandPalm size={24} />
                            Interrupt
                        </StopCountdownButton>
                    ) : (
                        <StartCountdownButton disabled={isSubmitDisabled} type="submit">
                            <Play size={24} />
                            Start
                        </StartCountdownButton>
                    )
                }
               
            </form>
        </HomeContainer>
    )
}