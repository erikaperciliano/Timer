import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from 'zod';
import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";
import { useForm } from "react-hook-form";

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Report the task'),
    minutesAmount: zod.number().min(1, 'The cycle must be at least 5 minutes.').max(60, 'The break must be a maximum of 60 minutes.'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function NewcycleForm() {
    const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }
    });
    
    return (
        <FormContainer>
            <label htmlFor="task">I will work on</label>
            <TaskInput 
                id="task" 
                list="task-suggestions"
                placeholder="Name your project"
                disabled={!!activeCycle}
                {...register('task')}
            />

            <datalist id='task-suggestions'>
                <option value="Project 1"/>
                <option value="Project 2"/>
                <option value="Project 3"/>
                <option value="Project 4"/>
            </datalist>

            <label htmlFor="minutesAmount">during</label>
            <MinutesAmountInput 
                type="number" 
                id="minutesAmount" 
                placeholder="00"
                step={5}
                min={1}
                max={60}
                disabled={!!activeCycle}
                {...register('minutesAmount', { valueAsNumber: true })}
            />

            <span>minutes.</span>
        </FormContainer>
    )
}