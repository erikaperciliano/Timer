import { Play } from "phosphor-react"
import { CountDownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountDownButton, TaskInput } from "./styles"

export const Home = () => {
    return(
        <HomeContainer>
            <form action="">
                <FormContainer>
                    <label htmlFor="task">I will work in</label>
                    <TaskInput list="task-sugestions" id="task" placeholder="Give a name for you project"/>
                    
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

                <StartCountDownButton type="submit">
                    <Play size={24}/>
                    Start
                </StartCountDownButton>
            </form>
        </HomeContainer>
    )
}