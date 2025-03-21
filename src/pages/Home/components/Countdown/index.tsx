import { useContext, useEffect } from "react";
import { CountdownContainer, Separator } from "./styles";
import { differenceInSeconds } from "date-fns";
import { CyclesContext } from "../../../../contexts/CyclesContext";

export function Countdown() {
    const { activeCycle, activeCycleId, markCurrentCycleAsFinished, amountSecondPassed, setSecondsPassed } = useContext(CyclesContext)

    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
    
    useEffect(() => {
        let interval: number;

        if(activeCycle){
            interval = window.setInterval(() => {
                const secondsDifference =  differenceInSeconds(new Date(), new Date(activeCycle.startDate))

                if(secondsDifference >= totalSeconds) {
                    markCurrentCycleAsFinished()
                    setSecondsPassed(totalSeconds)
                    clearInterval(interval)
                } else {
                    setSecondsPassed(secondsDifference)
                }

            }, 1000)
        }

        //removes the interval that I don't need more
        return () => {
            clearInterval(interval)
        }
    }, [activeCycle, totalSeconds, activeCycleId, markCurrentCycleAsFinished, setSecondsPassed])
        
      const currentSeconds = activeCycle ? totalSeconds - amountSecondPassed : 0
    
        const minutesAmount = Math.floor(currentSeconds / 60)
        const secondsAmount = currentSeconds % 60
    
        const minutes = String(minutesAmount).padStart(2, '0')
        const seconds = String(secondsAmount).padStart(2, '0')
    
        useEffect(() => {
            if(activeCycle) {
                document.title = `${minutes}:${seconds}`
            }
        }, [minutes, seconds, activeCycle])

    return(
        <CountdownContainer>
            <span>{minutes[0]}</span>
            <span>{minutes[1]}</span>
            <Separator>:</Separator>
            <span>{seconds[0]}</span>
            <span>{seconds[1]}</span>
        </CountdownContainer>
    )
}
