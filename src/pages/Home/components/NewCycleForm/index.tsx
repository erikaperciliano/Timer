import { useForm, useFormContext } from "react-hook-form";
import { FormContainer, TaskInput, MinutesAmountInput } from "../Countdown/styles"
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from 'zod'
import { useContext } from "react";
import { CyclesContext } from "../..";


export const NewCycleForm = () => {
    const { activeCycle } = useContext(CyclesContext)
    const { register } = useFormContext()

    
    return(
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
                        min={5} 
                        max={60}
                        disabled={!!activeCycle}
                        {...register('minutesAmount', { valueAsNumber: true})}
                    />

                    <span>minutes.</span>
                </FormContainer>
    )
}