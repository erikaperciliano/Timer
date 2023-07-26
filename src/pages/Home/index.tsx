import { Play } from "phosphor-react"
import { CountDownContainer, FormContainer, HomeContainer, Separator } from "./styles"

export const Home = () => {
    return(
        <HomeContainer>
            <form action="">
                <FormContainer>
                    <label htmlFor="task">I will work in</label>
                    <input id="task" />

                    <label htmlFor="minutesAmount">During</label>
                    <input type='number' id="minutesAmount"/>

                    <span>minutes.</span>
                </FormContainer>

                <CountDownContainer>
                    <span>0</span>
                    <span>0</span>
                    <Separator>:</Separator>
                    <span>0</span>
                    <span>0</span>
                </CountDownContainer>

                <button type="submit">
                    <Play size={24}/>
                    Start
                </button>
            </form>
        </HomeContainer>
    )
}