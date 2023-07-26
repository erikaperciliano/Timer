import { Play } from "phosphor-react"
import { CountDownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountDownButton, TaskInput } from "./styles"

export const Home = () => {
    return(
        <HomeContainer>
            <form action="">
                <FormContainer>
                    <label htmlFor="task">I will work in</label>
                    <TaskInput id="task" placeholder="Give a name for you project"/>

                    <label htmlFor="minutesAmount">During</label>
                    <MinutesAmountInput type='number' id="minutesAmount" placeholder="00"/>

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